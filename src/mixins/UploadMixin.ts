import { DraftType } from "@stores/UploadAttachmentStore";
import type { Channel } from "discord-types/general";
import { webpack } from "replugged";

interface PromptToUploadOptions {
  isClip?: boolean;
  isThumbnail?: boolean;
  requireConfirm?: boolean;
  showLargeMessageDialog?: boolean;
}

interface UploadMixinMod {
  promptToUpload: (
    files: FileList | null,
    channel: Channel,
    draftType: DraftType,
    options?: PromptToUploadOptions,
  ) => boolean;
  showUploadFileSizeExceededError: (channel: Channel, files: FileList | null) => boolean;
}

const mod = await webpack.waitForModule(webpack.filters.bySource(/MAX_SIZE_ERROR,\w+mimetypes/));

export default {
  promptToUpload: webpack.getFunctionBySource(mod, "ATTACHMENT_TOO_MANY_ERROR_TITLE"),
  showUploadFileSizeExceededError: webpack.getFunctionBySource(mod, "UPLOAD_AREA_TOO_LARGE_TITLE"),
} as UploadMixinMod;
