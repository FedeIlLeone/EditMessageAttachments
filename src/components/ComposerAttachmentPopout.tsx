import ChannelAttachmentUpload, {
  AttachmentListItemSizes,
} from "@components/ChannelAttachmentUpload";
import ComposerUploadButton from "@components/ComposerUploadButton";
import ScrollerThin from "@components/ScrollerThin";
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

  const uploads = Flux.useStateFromStores([UploadAttachmentStore], () => {
    return UploadAttachmentStore.getUploads(channelId, DraftType.ChannelMessage);
  });

  const keyboardModeEnabled = Flux.useStateFromStores([AccessibilityStore], () => {
    return AccessibilityStore.keyboardModeEnabled;
  });

  return (
    <ScrollerThin
      orientation="horizontal"
      className="editMessageAttachments-popout"
      paddingFix={false}
      fade={true}>
      <ComposerUploadButton channelId={channelId} attachmentsCount={attachmentsCount} />
      {uploads.length > 0 && (
        <div className="editMessageAttachments-uploads">
          {uploads.map((upload) => (
            <ChannelAttachmentUpload
              channelId={channelId}
              draftType={DraftType.ChannelMessage}
              upload={upload}
              keyboardModeEnabled={keyboardModeEnabled}
              hideFileName={true}
              size={AttachmentListItemSizes.SMALL}
            />
          ))}
        </div>
      )}
    </ScrollerThin>
  );
};
