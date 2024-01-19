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

interface ChunkUpload {
  bufferedFileData?: Blob;
  contentType: string;
  fileSize: number;
}

interface ChunkData {
  chunk: Blob;
  contentType: string;
  end: number;
  sessionUrl: string;
  start: number;
  totalSize: number;
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
  public _aborted: boolean;
  public channelId: string;
  public currentSize: number;
  public error?: string;
  public loaded: number;
  public postCompressionSize?: number;
  public preCompressionSize: number;
  public reactNativeFileIndex: number;
  public reactNativeFilePrepped: boolean;
  public responseUrl?: string;
  public RESUME_INCOMPLETE_CODES: number[];
  public status: CloudUploadStatus;
  public uploadedFilename?: string;

  public cancel: () => void;
  public delete: () => Promise<void>;
  public getChunk: (
    start: number,
    end: number,
    fileData: Blob | undefined,
  ) => Promise<Blob | undefined>;
  public getSize: () => Promise<number>;
  public handleComplete: (response: Record<string, unknown>) => void;
  public handleError: (error: Error | number) => void;
  public isUnsuccessfulChunkUpload: (response: Record<string, unknown>, end: number) => boolean;
  public prepareChunkUploadItem: () => Promise<ChunkUpload>;
  public reactNativeCompressAndExtractData: () => Promise<void>;
  public resetState: () => CloudUpload;
  public retryOpts: () => RetryOptions;
  public setFilename: (filename: string) => void;
  public setResponseUrl: (responseUrl: string) => void;
  public setStatus: (status: CloudUploadStatus) => void;
  public setUploadedFilename: (uploadedFilename: string) => void;
  public upload: () => Promise<void>;
  public uploadChunk: (data: ChunkData) => Promise<void>;
  public uploadFileToCloud: () => Record<string, unknown>;
  public uploadFileToCloudAsChunks: (chunkSize: number) => Promise<void>;
}
