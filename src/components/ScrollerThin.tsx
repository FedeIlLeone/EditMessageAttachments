import type React from "react";
import { webpack } from "replugged";

interface ScrollerThinProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  fade?: boolean;
  orientation?: "vertical" | "horizontal";
  paddingFix?: boolean;
}

export type ScrollerThinType = React.ForwardRefExoticComponent<ScrollerThinProps> & {
  render: React.ForwardRefRenderFunction<unknown, ScrollerThinProps>;
};

export default (
  await webpack.waitForProps<Record<"ScrollerThin", ScrollerThinType>>("ScrollerThin")
).ScrollerThin;
