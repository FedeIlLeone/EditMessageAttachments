import type React from "react";
import { webpack } from "replugged";

interface ScrollerThinProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
  fade?: boolean;
  orientation?: "vertical" | "horizontal";
  paddingFix?: boolean;
}

export type ScrollerThinType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<ScrollerThinProps> & React.RefAttributes<unknown>
>;

const components =
  await webpack.waitForProps<Record<"ScrollerThin", ScrollerThinType>>("ScrollerThin");

export default components.ScrollerThin;
