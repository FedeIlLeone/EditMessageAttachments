import UploadAttachmentActionCreators from "@actions/UploadAttachmentActionCreators";
import EditComposerAttachments from "@components/EditComposerAttachments";
import Settings from "@components/Settings";
import translations from "@i18n";
import EditMessageStore from "@stores/EditMessageStore";
import UploadAttachmentStore, { DraftType } from "@stores/UploadAttachmentStore";
import type {
  ChannelTextAreaContainerType,
  ChatInputType,
  CloudUploader as CloudUploaderType,
  EditedMessageData,
  MessageEditorProps,
} from "@types";
import { cfg } from "@utils/PluginSettingsUtils";
import UploaderUtils from "@utils/UploaderUtils";
import type React from "react";
import { Injector, Logger, common, i18n, webpack } from "replugged";

const { constants, messages, fluxDispatcher } = common;

let stopped = false;

export const logger = new Logger("Plugin", "EditMessageAttachments");
export const inject = new Injector();

export function _renderEditComposerAttachments(props: MessageEditorProps): React.ReactNode {
  const { channel, message } = props;

  if (!channel || !message) return null;

  return stopped ? null : <EditComposerAttachments channel={channel} message={message} />;
}

export function _checkIsInEditor(channelId: string): boolean {
  if (!channelId) return false;
  return stopped ? false : EditMessageStore.isEditingAny(channelId);
}

export function _checkHasUploads(channelId: string): boolean {
  if (!channelId) return false;

  const uploadCount = UploadAttachmentStore.getUploadCount(
    channelId,
    DraftType.EditedChannelMessage,
  );
  return stopped ? false : uploadCount > 0;
}

export function _clearUploads(channelId: string): void {
  if (!cfg.get("clearOnCancel")) return;
  if (channelId && !stopped)
    UploadAttachmentActionCreators.clearAll(channelId, DraftType.EditedChannelMessage);
}

export async function _patchEditMessageAction(
  data: EditedMessageData,
  originalFunction: (response: Record<string, unknown>) => void,
): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!data) return;

  const { channelId, messageId } = data;

  const CloudUploader = await webpack.waitForModule<typeof CloudUploaderType>(
    webpack.filters.bySource("_createMessage"),
  );
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!CloudUploader) {
    logger.error("Failed to find CloudUploader");
    return;
  }

  const url = (constants.Endpoints.MESSAGE as (channelId: string, messageId: string) => string)(
    channelId,
    messageId,
  );
  const cloudUploader = new CloudUploader(url, "PATCH");

  const message = messages.getMessage(channelId, messageId);
  const files = UploadAttachmentStore.getUploads(channelId, DraftType.EditedChannelMessage);

  function runOriginalFunction(response: Record<string, unknown>): void {
    const patchedResponse = { body: response };
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (originalFunction) originalFunction(patchedResponse);
  }

  cloudUploader.on("start", (file) => {
    fluxDispatcher.dispatch({
      type: "UPLOAD_START",
      channelId,
      file,
      message,
      uploader: cloudUploader,
    });
  });
  cloudUploader.on("progress", (file) => {
    fluxDispatcher.dispatch({
      type: "UPLOAD_PROGRESS",
      channelId,
      file,
    });
  });
  cloudUploader.on("error", (file, __, response) => {
    fluxDispatcher.dispatch({
      type: "UPLOAD_FAIL",
      channelId,
      file,
      messageRecord: message,
    });

    runOriginalFunction(response);
  });
  cloudUploader.on("complete", (file, response) => {
    fluxDispatcher.dispatch({
      type: "UPLOAD_COMPLETE",
      channelId,
      file,
      // @ts-expect-error i aint touching your
      aborted: cloudUploader._aborted,
    });
    runOriginalFunction(response);
  });

  void cloudUploader.uploadFiles(
    files,
    { ...data, attachments: message?.attachments },
    { addFilesTo: "attachments" },
  );

  UploadAttachmentActionCreators.clearAll(channelId, DraftType.EditedChannelMessage);
}

async function patchChannelTextAreaContainer(): Promise<void> {
  const ChannelTextAreaContainer = await webpack.waitForModule<ChannelTextAreaContainerType>(
    webpack.filters.bySource(/renderApplicationCommandIcon:\w+,pendingReply:\w+/),
  );
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!ChannelTextAreaContainer) {
    logger.error("Failed to find ChannelTextAreaContainer");
    return;
  }

  // Enable sending an empty message and pasting files while editing
  inject.before(ChannelTextAreaContainer.type, "render", ([props]) => {
    // We don't need to listen to store changes, it re-renders pretty much constantly
    const isEditing = EditMessageStore.isEditingAny(props.channel.id);
    if (isEditing && props.type.submit && props.type.analyticsName === "edit") {
      props.type.submit.allowEmptyMessage = true;
      props.promptToUpload ||= UploaderUtils.promptToUpload;
    }
  });
}

function patchStartEditMessageAction(): void {
  inject.after(messages, "startEditMessage", ([channelId]) => {
    if (!cfg.get("clearOnCancel")) return;
    UploadAttachmentActionCreators.clearAll(channelId, DraftType.EditedChannelMessage);
  });
}

async function patchEditChatInputType(stop?: boolean): Promise<void> {
  const { ChatInputTypes } =
    await webpack.waitForProps<Record<string, Record<string, ChatInputType>>>("ChatInputTypes");
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!ChatInputTypes) {
    logger.error("Failed to find ChatInputTypes");
    return;
  }

  ChatInputTypes.EDIT.drafts.type = stop
    ? DraftType.ChannelMessage
    : DraftType.EditedChannelMessage;
}

export { Settings, cfg };

export async function start(): Promise<void> {
  i18n.loadAllStrings(translations);

  await patchChannelTextAreaContainer();
  patchStartEditMessageAction();
  await patchEditChatInputType();

  stopped = false;
}

export async function stop(): Promise<void> {
  inject.uninjectAll();
  await patchEditChatInputType(true);

  stopped = true;
}
