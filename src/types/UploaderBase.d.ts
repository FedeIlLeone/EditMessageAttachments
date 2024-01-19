import type { Message } from "discord-types/general";
import EventEmitter from "events";
import type { CloudUpload } from "./CloudUpload";

export interface UploaderBaseOptions {
  raiseEndpointErrors?: boolean;
}

interface UploaderBaseFile {
  attachmentsCount: number;
  channelId: string | undefined;
  compressionProgress: number;
  currentSize: number;
  draftContent: string | undefined;
  hasImage: boolean;
  hasVideo: boolean;
  id: string;
  items: CloudUpload[];
  name: string;
  progress: number;
  rate: number;
  totalPreCompressionSize: number;
}

interface AttachmentPayload {
  description?: string;
  durationSecs?: number;
  filename: string;
  id: string;
  isClip?: boolean;
  isRemix?: boolean;
  isThumbnail?: boolean;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  uploaded_filename: string;
  waveform?: string;
}

interface UploaderBaseError {
  body?: string;
  code?: number;
  reason?: string;
}

interface UploaderBaseFileOptions {
  name: string;
}

export declare class UploaderBase extends EventEmitter {
  public constructor(url: string, method?: "POST" | "PATCH", options?: UploaderBaseOptions);

  private _lastUpdate: number;
  private _loaded: number;
  private _token: string;
  protected _file?: UploaderBaseFile;
  protected _method: "POST" | "PATCH";
  protected _raiseEndpointErrors: boolean;
  protected _url: string;
  public _aborted: boolean;
  public _errored: boolean;
  public alreadyStarted: boolean;
  public id: string;
  public processingMessageChangeInterval?: number | undefined;

  protected _addAttachmentsToPayload: (
    data: Record<string, unknown>,
    addFilesTo: string | undefined,
    attachmentsPayload: AttachmentPayload[],
  ) => Record<string, unknown>;
  protected _cancel?: () => void;
  protected _handleAborted: () => void;
  protected _handleComplete: (body: Message | Record<string, unknown>) => void;
  protected _handleError: (uploaderBaseError: UploaderBaseError) => void;
  protected _handleException: (error: Error) => void;
  protected _handleProgress: (
    loaded: number,
    currentSize: number,
    filesProgress?: Record<string, number>,
  ) => void;
  protected _handleStart: (cancelCallback: () => void) => void;
  public cancel: () => void;
  public cancelItem: (id: string) => void;
  public clearProcessingMessageInterval: () => void;
  public upload: (
    options: UploaderBaseFileOptions,
    data: Record<string, unknown> | null,
    items: CloudUpload[],
  ) => void;
}
