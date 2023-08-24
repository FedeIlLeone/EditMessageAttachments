import type { CloudUpload } from "@types";
import { webpack } from "replugged";
import type { Store } from "replugged/dist/renderer/modules/common/flux";

export enum DraftType {
  ChannelMessage,
  ThreadSettings,
  FirstThreadMessage,
  ApplicationLauncherCommand,
}

export interface UploadAttachmentStore extends Store {
  findUpload: (
    channelId: string,
    draftType: DraftType,
    finder: CloudUpload[]["find"],
  ) => CloudUpload | undefined;
  getFirstUpload: (channelId: string, draftType: DraftType) => CloudUpload | null;
  getUpload: (channelId: string, uploadId: string, draftType: DraftType) => CloudUpload | undefined;
  getUploadCount: (channelId: string, draftType: DraftType) => number;
  getUploads: (channelId: string, draftType: DraftType) => CloudUpload[];
  hasAdditionalUploads: (channelId: string, draftType: DraftType) => boolean;
}

export default webpack.getByStoreName<UploadAttachmentStore>("UploadAttachmentStore")!;
