import { DraftType } from "@stores/UploadAttachmentStore";
import type { CloudUpload, Item } from "@types";
import { webpack } from "replugged";

interface CommonAddOptions {
  channelId: string;
  draftType: DraftType;
  showLargeMessageDialog: boolean;
}

interface AddFileOptions extends CommonAddOptions {
  file: Item;
}

interface AddFilesOptions extends CommonAddOptions {
  files: Item[];
}

interface SetFileOptions {
  channelId: string;
  draftType: DraftType;
  file: Item;
  id: string;
}

interface SetUploadsOptions {
  channelId: string;
  draftType: DraftType;
  resetState?: boolean;
  uploads: CloudUpload[];
}

interface UpdateOptions {
  description?: string;
  filename?: string;
  spoiler?: boolean;
  thumbnail?: boolean;
}

export interface UploadAttachmentAddFilesPayload extends AddFilesOptions {
  type: "UPLOAD_ATTACHMENT_ADD_FILES";
}

interface UploadAttachmentActions {
  addFile: (options: AddFileOptions) => void;
  addFiles: (options: AddFilesOptions) => void;
  clearAll: (channelId: string, draftType: DraftType) => void;
  popFirstFile: (channelId: string) => void;
  remove: (channelId: string, uploadId: string, draftType: DraftType) => void;
  removeFiles: (channelId: string, uploadIds: string[], draftType: DraftType) => void;
  setFile: (options: SetFileOptions) => void;
  setUploads: (options: SetUploadsOptions) => void;
  update: (
    channelId: string,
    uploadId: string,
    draftType: DraftType,
    options: UpdateOptions,
  ) => void;
}

export default await webpack.waitForProps<UploadAttachmentActions>("popFirstFile", "addFiles");
