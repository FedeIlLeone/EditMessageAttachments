import FileInput, { type FileInputRef } from "@components/FileInput";
import ImagePlaceholderWithPlusIcon from "@components/ImagePlaceholderWithPlusIcon";
import UploadMixin from "@mixins/UploadMixin";
import ChannelStore from "@stores/ChannelStore";
import UploadAttachmentStore, { DraftType } from "@stores/UploadAttachmentStore";
import { common, components } from "replugged";
import { logger } from "..";

import "./ComposerUploadButton.css";

const {
  flux: Flux,
  i18n: { Messages },
  modal,
  React,
} = common;
const { Clickable } = components;

const MAX_UPLOAD_COUNT = 10;

interface ComposerUploadButtonProps {
  attachmentsCount: number;
  channelId: string;
}

export default (props: ComposerUploadButtonProps): React.ReactElement | null => {
  const { attachmentsCount, channelId } = props;

  const ref = React.useRef<FileInputRef | null>(null);

  const uploadsCount = Flux.useStateFromStores([UploadAttachmentStore], () => {
    return UploadAttachmentStore.getUploadCount(channelId, DraftType.ChannelMessage);
  });

  const channel = Flux.useStateFromStores(
    [ChannelStore],
    () => {
      return ChannelStore.getChannel(channelId);
    },
    [channelId],
  );

  if (!channel) {
    logger.error("Channel is null", channelId);
    return null;
  }

  return (
    <Clickable
      className="editMessageAttachments-uploadInput"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          if (ref.current) ref.current.activateUploadDialogue();
        }
      }}>
      <FileInput
        className="editMessageAttachments-fileInput"
        ref={ref}
        onChange={(event) => {
          const count = event.currentTarget.files?.length ?? 0;
          if (attachmentsCount + count + uploadsCount > MAX_UPLOAD_COUNT) {
            modal.alert({
              title: Messages.ATTACHMENT_TOO_MANY_ERROR_TITLE,
              body: Messages.ATTACHMENT_TOO_MANY_ERROR_MESSAGE.format({ limit: MAX_UPLOAD_COUNT }),
            });
            return;
          }

          UploadMixin.promptToUpload(event.currentTarget.files, channel, DraftType.ChannelMessage, {
            requireConfirm: true,
            showLargeMessageDialog: false,
          });

          event.currentTarget.value = "";
        }}
        disabled={attachmentsCount + uploadsCount >= MAX_UPLOAD_COUNT}
        multiple={channel.rateLimitPerUser <= 0}
        tabIndex={-1}
        aria-hidden={true}
      />
      <ImagePlaceholderWithPlusIcon
        className="editMessageAttachments-uploadIcon"
        width={28}
        height={28}
      />
    </Clickable>
  );
};
