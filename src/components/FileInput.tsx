import type React from "react";
import { webpack } from "replugged";

interface FileInputProps {
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

export type FileInputType = React.ComponentClass<FileInputProps>;

// I don't like this
export type FileInputRef = React.ElementRef<FileInputType> & {
  activateUploadDialogue: () => void;
};

export default await webpack.waitForModule<FileInputType>(
  webpack.filters.bySource("_ref.activateUploadDialogue"),
);
