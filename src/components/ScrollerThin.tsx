import type React from "react";
import { webpack } from "replugged";

interface ScrollerThinProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  className?: string;
  dir?: "ltr" | "rtl" | "auto";
  fade?: boolean;
  orientation?: "vertical" | "horizontal";
  paddingFix?: boolean;
}

export type ScrollerThinType = React.ForwardRefExoticComponent<ScrollerThinProps> & {
  render: React.ForwardRefRenderFunction<unknown>;
};

export default (
  await webpack.waitForProps<Record<"ScrollerThin", ScrollerThinType>>("ScrollerThin")
).ScrollerThin;
