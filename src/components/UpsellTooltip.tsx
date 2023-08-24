import type React from "react";
import { webpack } from "replugged";

interface UpsellTooltipProps {
  asset?: React.ReactNode;
  buttonCTA?: string;
  buttonLayout?: number;
  caretPosition?: string;
  className?: string;
  content: string;
  contentClassName?: string;
  header?: string;
  headerClassName?: string;
  markAsDismissed?: (contentDismissActionType: string) => void;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onComponentMount?: () => void;
  onSecondaryClick?: () => void;
  secondaryButtonCTA?: string;
}

export type UpsellTooltipType = React.FC<UpsellTooltipProps> & {
  CaretPosition: Record<
    | "TOP_CENTER"
    | "TOP_RIGHT"
    | "TOP_LEFT"
    | "BOTTOM_CENTER"
    | "BOTTOM_LEFT"
    | "LEFT_CENTER"
    | "RIGHT_CENTER",
    string
  >;
  ButtonLayout: Record<"ADJACENT" | "STACKED", number>;
};

const upsellTooltipRgx = /buttonCTA,.{1,4}secondaryButtonCTA/;

export default await webpack
  .waitForModule(webpack.filters.bySource(upsellTooltipRgx))
  .then((mod) => webpack.getFunctionBySource<UpsellTooltipType>(mod, upsellTooltipRgx)!);
