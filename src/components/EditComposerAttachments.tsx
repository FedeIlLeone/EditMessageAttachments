import UploadAttachmentActionCreators from "@actions/UploadAttachmentActionCreators";
import ComposerAttachmentPopout from "@components/ComposerAttachmentPopout";
import Popout, { PopoutAlign, PopoutPositions } from "@components/Popout";
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

  const uploadsCount = Flux.useStateFromStores([UploadAttachmentStore], () => {
    return UploadAttachmentStore.getUploadCount(channelId, DraftType.ChannelMessage);
  });

  const attachmentsCount = message.attachments.length;

  if (uploadsCount + attachmentsCount > MAX_UPLOAD_COUNT)
    UploadAttachmentActionCreators.clearAll(channelId, DraftType.ChannelMessage);

  const canAttach = Flux.useStateFromStores([PermissionStore], () => {
    return (
      channel.isPrivate() ||
      (PermissionStore.can(constants.Permissions!.ATTACH_FILES, channel) &&
        PermissionStore.can(constants.Permissions!.SEND_MESSAGES, channel))
    );
  });
  if (!canAttach) return null;

  const [shouldShow, setShouldShow] = React.useState(false);

  React.useEffect(() => {
    const showFn = (): void => setShouldShow(true);

    Dispatcher.subscribe("UPLOAD_ATTACHMENT_ADD_FILES", showFn);
    return () => Dispatcher.unsubscribe("UPLOAD_ATTACHMENT_ADD_FILES", showFn);
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
