import UploadAttachmentActionCreators, {
  type UploadAttachmentAddFilesPayload,
} from "@actions/UploadAttachmentActionCreators";
import ComposerAttachmentPopout from "@components/ComposerAttachmentPopout";
import Popout, { PopoutAlign, PopoutPositions } from "@components/webpack/Popout";
import PermissionStore from "@stores/PermissionStore";
import UploadAttachmentStore, { DraftType } from "@stores/UploadAttachmentStore";
import type { Channel, Message } from "discord-types/general";
import { common } from "replugged";
import { MAX_UPLOAD_COUNT } from "../constants";

import "./EditComposerAttachments.css";

const { constants, flux: Flux, fluxDispatcher: Dispatcher, i18n, React } = common;

interface EditComposerAttachmentsProps {
  channel: Channel;
  message: Message;
}

export default (props: EditComposerAttachmentsProps): React.ReactElement | null => {
  const { channel, message } = props;

  const channelId = channel.id;

  const uploadsCount = Flux.useStateFromStores([UploadAttachmentStore], () =>
    UploadAttachmentStore.getUploadCount(channelId, DraftType.EditedChannelMessage),
  );

  const attachmentsCount = message.attachments.length;

  if (uploadsCount + attachmentsCount > MAX_UPLOAD_COUNT)
    UploadAttachmentActionCreators.clearAll(channelId, DraftType.EditedChannelMessage);

  const canAttach = Flux.useStateFromStores(
    [PermissionStore],
    () =>
      channel.isPrivate() ||
      (PermissionStore.can(constants.Permissions!.ATTACH_FILES, channel) &&
        PermissionStore.can(constants.Permissions!.SEND_MESSAGES, channel)),
  );
  if (!canAttach) return null;

  const [shouldShow, setShouldShow] = React.useState(false);

  React.useEffect(() => {
    const showFn = (action: UploadAttachmentAddFilesPayload): void => {
      if (action.draftType === DraftType.EditedChannelMessage) setShouldShow(true);
    };

    Dispatcher.subscribe<UploadAttachmentAddFilesPayload>("UPLOAD_ATTACHMENT_ADD_FILES", showFn);
    return () =>
      Dispatcher.unsubscribe<UploadAttachmentAddFilesPayload>(
        "UPLOAD_ATTACHMENT_ADD_FILES",
        showFn,
      );
  });

  return (
    <Popout
      renderPopout={() => (
        <ComposerAttachmentPopout channelId={channelId} attachmentsCount={attachmentsCount} />
      )}
      position={PopoutPositions.TOP}
      align={PopoutAlign.RIGHT}
      shouldShow={shouldShow}
      onRequestClose={() => setShouldShow(false)}
      ignoreModalClicks>
      {(props) => (
        <a
          {...props}
          onClick={() => setShouldShow(!shouldShow)}
          className="editMessageAttachments-attachmentsCount">
          {i18n.Messages.EDITMESSAGEATTACHMENTS_COUNT_ATTACHMENTS.format({
            count: (uploadsCount + attachmentsCount).toString(),
          })}
        </a>
      )}
    </Popout>
  );
};
