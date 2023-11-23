import EventEmitter from "events";

declare enum UploadPlatform {
  REACT_NATIVE,
  WEB,
}

type FileType =
  | "photoshop"
  | "webcode"
  | "image"
  | "video"
  | "acrobat"
  | "ae"
  | "sketch"
  | "ai"
  | "archive"
  | "code"
  | "document"
  | "spreadsheet"
  | "webcode"
  | "audio"
  | "unknown";

interface ItemReactNative {
  durationSecs: number;
  file: File;
  filename: string;
  clip?: boolean;
  isRemix: boolean;
  isThumbnail: boolean;
  mimeType: string;
  origin: string;
  platform: UploadPlatform.REACT_NATIVE;
  uri: string;
  waveform: string;
}

interface ItemWeb {
  clip?: boolean;
  file: File;
  isThumbnail: boolean;
  platform: UploadPlatform.WEB;
}

export type Item = ItemReactNative | ItemWeb;

export declare class Upload extends EventEmitter {
  public constructor(item: Item, showLargeMessageDialog: boolean);

  public classification?: FileType;
  public clip: boolean | undefined;
  public description: string | null;
  public durationSecs?: number;
  public filename: string;
  public id: string;
  public isImage: boolean;
  public isRemix?: boolean;
  public isThumbnail: boolean | undefined;
  public isVideo: boolean;
  public item: Item;
  public mimeType: string;
  public origin?: string;
  public showLargeMessageDialog: boolean;
  public spoiler: boolean;
  public uniqueId: string;
  public uri?: string;
  public waveform?: string;

  public cancel: () => void;
  public resetState: () => this;
}
