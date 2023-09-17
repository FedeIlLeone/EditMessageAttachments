import { DraftType } from "@stores/UploadAttachmentStore";
import type { CloudUpload } from "@types";
import type React from "react";
import { webpack } from "replugged";

export enum AttachmentListItemSizes {
  SMALL,
  MEDIUM,
}

interface ChannelAttachmentUploadProps {
  canEdit?: boolean;
  channelId: string;
  draftType: DraftType;
  hideFileName?: boolean;
  keyboardModeEnabled?: boolean;
  label?: string;
  size?: AttachmentListItemSizes;
  upload: CloudUpload;
}

export type ChannelAttachmentUploadType = React.FC<ChannelAttachmentUploadProps>;

const channelAttachmentUploadStr = "().filenameContainer";

export default await webpack
  .waitForModule(webpack.filters.bySource(channelAttachmentUploadStr))
  .then(
    (mod) =>
      webpack.getFunctionBySource<ChannelAttachmentUploadType>(mod, channelAttachmentUploadStr)!,
  );
