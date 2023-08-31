import UploadAttachmentActionCreators from "@actions/UploadAttachmentActionCreators";
import EditComposerAttachments from "@components/EditComposerAttachments";
import FileUploadDisabledTooltip from "@components/FileUploadDisabledTooltip";
import translations from "@i18n";
import EditMessageStore from "@stores/EditMessageStore";
import UploadAttachmentStore, { DraftType } from "@stores/UploadAttachmentStore";
import type {
  CloudUploader as CloudUploaderType,
  EditedMessageData,
  MemoChannelTextAreaContainerType,
  MemoDisableableChannelAttachmentAreaType,
  MessageEditorProps,
} from "@types";
import { cfg } from "@utils/PluginSettingsUtils";
import type React from "react";
import { Injector, Logger, common, i18n, webpack } from "replugged";

const { constants, flux: Flux, messages } = common;

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

// I don't like this at all, but we need it to add it as a dependency of useStateFromStores
export function _getEditMessageStore(): typeof EditMessageStore {
  return EditMessageStore;
}

export function _checkHasUploads(channelId: string): boolean {
  if (!channelId) return false;

  const uploadCount = UploadAttachmentStore.getUploadCount(channelId, DraftType.ChannelMessage);
  return stopped ? false : uploadCount > 0;
}

export function _clearUploads(channelId: string): void {
  if (!channelId) return;
  UploadAttachmentActionCreators.clearAll(channelId, DraftType.ChannelMessage);
}

export async function _patchEditMessageAction(
  data: EditedMessageData,
  originalFunction: (response: Record<string, unknown>) => void,
): Promise<void> {
  if (!data) return;

  const { channelId, messageId } = data;

  const CloudUploader = await webpack.waitForModule<typeof CloudUploaderType>(
    webpack.filters.bySource("_createMessage"),
  );

  const url = (constants.Endpoints.MESSAGE as (channelId: string, messageId: string) => string)(
    channelId,
    messageId,
  );
  const cloudUploader = new CloudUploader(url, "PATCH");

  const message = messages.getMessage(channelId, messageId);
  const files = UploadAttachmentStore.getUploads(channelId, DraftType.ChannelMessage);

  function runOriginalFunction(response: Record<string, unknown>): void {
    const patchedResponse = { body: response };
    if (originalFunction) originalFunction(patchedResponse);
  }

  cloudUploader.on("error", (_, __, response) => runOriginalFunction(response));
  cloudUploader.on("complete", (_, response) => runOriginalFunction(response));

  cloudUploader.uploadFiles(
    files,
    { ...data, attachments: message?.attachments },
    { addFilesTo: "attachments" },
  );

  UploadAttachmentActionCreators.clearAll(channelId, DraftType.ChannelMessage);
}

async function patchDisableableChannelAttachmentArea(): Promise<void> {
  const MemoDisableableChannelAttachmentArea =
    await webpack.waitForModule<MemoDisableableChannelAttachmentAreaType>(
      webpack.filters.bySource(/\.canAttachFiles.+?{channelId/),
    );

  inject.before(MemoDisableableChannelAttachmentArea, "type", ([props]) => {
    const isEditing = Flux.useStateFromStores([EditMessageStore], () => {
      return EditMessageStore.isEditingAny(props.channelId);
    });
    if (isEditing) props.canAttachFiles = false;
  });
}

async function patchChannelTextAreaContainer(): Promise<void> {
  const MemoChannelTextAreaContainer =
    await webpack.waitForModule<MemoChannelTextAreaContainerType>(
      webpack.filters.bySource(/renderAttachButton,.{1,3}\.renderApplicationCommandIcon/),
    );

  inject.after(MemoChannelTextAreaContainer.type, "render", ([props], res: React.ReactElement) => {
    const children = res?.props?.children?.props?.children;
    if (children?.[1] && props.renderAttachButton) {
      children[1] = (
        <FileUploadDisabledTooltip channelId={props.channel.id}>
          {children[1]}
        </FileUploadDisabledTooltip>
      );
    }

    const isEditing = EditMessageStore.isEditingAny(props.channel.id);
    // We don't need to listen to store changes, it re-renders pretty much constantly
    if (isEditing && props.type) {
      (props.type.submit as Record<string, boolean>).allowEmptyMessage = true;
    }
  });
}

function patchStartEditMessageAction(): void {
  inject.after(messages, "startEditMessage", ([channelId]) => {
    UploadAttachmentActionCreators.clearAll(channelId, DraftType.ChannelMessage);
  });
}

export { cfg };

export async function start(): Promise<void> {
  i18n.loadAllStrings(translations);

  await patchDisableableChannelAttachmentArea();
  await patchChannelTextAreaContainer();
  patchStartEditMessageAction();

  stopped = false;
}

export function stop(): void {
  inject.uninjectAll();
  stopped = true;
}
