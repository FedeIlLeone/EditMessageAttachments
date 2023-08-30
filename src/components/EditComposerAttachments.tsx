import UploadAttachmentActionCreators from "@actions/UploadAttachmentActionCreators";
import ComposerAttachmentPopout from "@components/ComposerAttachmentPopout";
import Popout, { PopoutAlign, PopoutPositions } from "@components/Popout";
import UploadAttachmentStore, { DraftType } from "@stores/UploadAttachmentStore";
import type { Message } from "discord-types/general";
import type React from "react";
import { common } from "replugged";
import { MAX_UPLOAD_COUNT } from "../constants";

import "./EditComposerAttachments.css";

const {
  flux: Flux,
  i18n: { Messages },
} = common;

interface EditComposerAttachmentsProps {
  channelId: string;
  message: Message;
}

export default (props: EditComposerAttachmentsProps): React.ReactElement => {
  const { channelId, message } = props;

  const uploadsCount = Flux.useStateFromStores([UploadAttachmentStore], () => {
    return UploadAttachmentStore.getUploadCount(channelId, DraftType.ChannelMessage);
  });

  const attachmentsCount = message.attachments.length ?? 0;

  if (uploadsCount + attachmentsCount > MAX_UPLOAD_COUNT)
    UploadAttachmentActionCreators.clearAll(channelId, DraftType.ChannelMessage);

  return (
    <Popout
      renderPopout={() => (
        <ComposerAttachmentPopout channelId={channelId} attachmentsCount={attachmentsCount} />
      )}
      position={PopoutPositions.TOP}
      align={PopoutAlign.RIGHT}
      ignoreModalClicks>
      {(props) => (
        <a {...props} className="editMessageAttachments-attachmentsCount">
          {Messages.EDITMESSAGEATTACHMENTS_COUNT_ATTACHMENTS.format({
            count: (uploadsCount + attachmentsCount).toString(),
          })}
        </a>
      )}
    </Popout>
  );
};
