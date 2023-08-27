import type { Message } from "discord-types/general";
import type { CloudUpload } from "./CloudUpload";
import type { CloudUploaderBase } from "./CloudUploaderBase";
import type { UploaderBaseOptions } from "./UploaderBase";

interface CloudUploaderUploadOptions {
  addFilesTo?: string;
}

export declare class CloudUploader extends CloudUploaderBase {
  public constructor(url: string, method?: "POST" | "PATCH", options?: UploaderBaseOptions);

  private _createMessage: (
    abortSignal: AbortSignal,
    data: Record<string, unknown>,
    addFilesTo: string | undefined,
  ) => Message | Record<string, unknown>;
  public uploadFiles: (
    files: CloudUpload[],
    data: Record<string, unknown>,
    options?: CloudUploaderUploadOptions,
  ) => Message | Record<string, unknown>;
}
