import type { Backoff } from "replugged/dist/renderer/modules/common/api";
import type { Item, Upload } from "./Upload";

declare enum CloudUploadStatus {
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  UPLOADING = "UPLOADING",
  ERROR = "ERROR",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
}

interface RetryOptions {
  backoff: Backoff;
  retries: number;
  timeout: number;
}

export declare class CloudUpload extends Upload {
  public constructor(
    item: Item,
    channelId: string,
    showLargeMessageDialog: boolean,
    reactNativeFileIndex: number,
  );

  public static fromJson: (data: Record<string, unknown>) => CloudUpload;

  private _abortController: AbortController;
  private _aborted: boolean;
  public channelId: string;
  public currentSize: number;
  public error?: string;
  public loaded: number;
  public postCompressionSize?: number;
  public preCompressionSize: number;
  public reactNativeFileIndex: number;
  public reactNativeFilePrepped: boolean;
  public status: CloudUploadStatus;
  public uploadedFilename?: string;

  public cancel: () => void;
  public delete: () => Promise<void>;
  public getSize: () => Promise<number>;
  public handleComplete: (response: Record<string, unknown>) => void;
  public handleError: (error: Error | number) => void;
  public reactNativeCompressAndExtractData: () => Promise<void>;
  public resetState: () => CloudUpload;
  public retryOpts: () => RetryOptions;
  public setFilename: (filename: string) => void;
  public setResponseUrl: (responseUrl: string) => void;
  public setStatus: (status: CloudUploadStatus) => void;
  public setUploadedFilename: (uploadedFilename: string) => void;
  public upload: () => Promise<void>;
  public uploadFileToCloud: () => Record<string, unknown>;
}
