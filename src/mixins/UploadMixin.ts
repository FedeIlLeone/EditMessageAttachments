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

export default await webpack.waitForProps<UploadMixinMod>("showUploadFileSizeExceededError");
