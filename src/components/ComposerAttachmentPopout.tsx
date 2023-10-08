import ChannelAttachmentUpload, {
  AttachmentListItemSizes,
} from "@components/webpack/ChannelAttachmentUpload";
import ComposerUploadButton from "@components/ComposerUploadButton";
import ScrollerThin from "@components/webpack/ScrollerThin";
import AccessibilityStore from "@stores/AccessibilityStore";
import UploadAttachmentStore, { DraftType } from "@stores/UploadAttachmentStore";
import type React from "react";
import { common } from "replugged";

import "./ComposerAttachmentPopout.css";

const { flux: Flux } = common;

interface ComposerAttachmentPopoutProps {
  attachmentsCount: number;
  channelId: string;
}

export default (props: ComposerAttachmentPopoutProps): React.ReactElement => {
  const { attachmentsCount, channelId } = props;

  const uploads = Flux.useStateFromStores([UploadAttachmentStore], () =>
    UploadAttachmentStore.getUploads(channelId, DraftType.EditedChannelMessage),
  );

  const keyboardModeEnabled = Flux.useStateFromStores(
    [AccessibilityStore],
    () => AccessibilityStore.keyboardModeEnabled,
  );

  return (
    <ScrollerThin
      orientation="horizontal"
      className="editMessageAttachments-popout"
      paddingFix={false}
      fade>
      <ComposerUploadButton channelId={channelId} attachmentsCount={attachmentsCount} />
      {uploads.length > 0 && (
        <div className="editMessageAttachments-uploads">
          {uploads.map((upload) => (
            <ChannelAttachmentUpload
              channelId={channelId}
              draftType={DraftType.EditedChannelMessage}
              upload={upload}
              keyboardModeEnabled={keyboardModeEnabled}
              hideFileName
              size={AttachmentListItemSizes.SMALL}
            />
          ))}
        </div>
      )}
    </ScrollerThin>
  );
};
