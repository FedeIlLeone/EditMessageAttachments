import type React from "react";
import { webpack } from "replugged";

interface ImagePlaceholderWithPlusIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  color?: string;
  height?: number;
  width?: number;
}

export type ImagePlaceholderWithPlusIconType = React.FC<ImagePlaceholderWithPlusIconProps>;

export default await webpack.waitForModule<ImagePlaceholderWithPlusIconType>(
  webpack.filters.bySource("0V3H24V5H2"),
);
