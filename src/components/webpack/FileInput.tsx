import type React from "react";
import { webpack } from "replugged";

interface CommonFileInputProps {
  "aria-hidden"?: boolean;
  "aria-label"?: string;
  className?: string;
  disabled?: boolean;
  embedded?: boolean;
  filters?: Array<{ extensions: string[] }>;
  handleNativeClick?: (props: FileInputProps) => void;
  multiple?: boolean;
  name?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  tabIndex?: number;
}

export declare class CommonFileInput extends React.Component<CommonFileInputProps> {
  private _input: HTMLInputElement | null;

  public activateUploadDialogue: () => void;
  public handleBrowserInputMouseDown: React.MouseEventHandler<HTMLInputElement>;
  public handleNativeClick: () => void;
  public handleNativeKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
}

interface FileInputProps extends CommonFileInputProps {}

export declare class FileInput extends React.Component<FileInputProps> {
  private _ref: React.RefObject<CommonFileInput> | null;

  public activateUploadDialogue: () => void;
  public setRef: (ref: CommonFileInput | null) => void;
}

export default await webpack.waitForModule<typeof FileInput>(
  webpack.filters.bySource("_ref.activateUploadDialogue"),
);
