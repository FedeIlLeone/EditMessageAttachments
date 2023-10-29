import type { CloudUpload } from "./CloudUpload";
import type { UploaderBase, UploaderBaseOptions } from "./UploaderBase";

interface CloudUploaderProgress {
  loaded: number;
  total: number;
}

export declare class CloudUploaderBase extends UploaderBase {
  public constructor(url: string, method?: "POST" | "PATCH", options?: UploaderBaseOptions);

  public files: CloudUpload[];

  private _fileSize: () => number;
  private _filesTooLarge: () => boolean;
  private _recomputeProgress: () => void;
  private _recomputeProgressByFile: () => Record<string, number>;
  private _recomputeProgressTotal: () => CloudUploaderProgress;
  private _remainingUploadCount: () => number;
  public cancel: () => void;
  public cancelItem: (itemId: string) => Promise<void>;
  public clear: () => number;
  public compressAndCheckFileSize: () => Promise<boolean>;
  public failed: () => boolean;
  public setUploadingTextForUI: () => void;
}
