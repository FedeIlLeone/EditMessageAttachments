import type React from "react";
import { webpack } from "replugged";

type ImagePlaceholderWithPlusIconProps = React.ComponentPropsWithoutRef<"svg">;

export type ImagePlaceholderWithPlusIconType = React.FC<ImagePlaceholderWithPlusIconProps>;

export default await webpack.waitForModule<ImagePlaceholderWithPlusIconType>(
  webpack.filters.bySource("0V3H24V5H2"),
);
