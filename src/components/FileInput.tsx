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

export default await webpack.waitForModule<FileInputType>(
  webpack.filters.bySource("_ref.activateUploadDialogue"),
);
