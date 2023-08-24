import type React from "react";
import { webpack } from "replugged";

export enum PopoutAlign {
  BOTTOM = "bottom",
  TOP = "top",
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export enum PopoutPositions {
  BOTTOM = "bottom",
  TOP = "top",
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
  WINDOW_CENTER = "window_center",
}

interface BasePopoutChildrenProps {
  "aria-controls": string | undefined;
  "aria-expanded": boolean;
  onClick: React.MouseEventHandler;
  onKeyDown: React.KeyboardEventHandler;
  onMouseDown: React.MouseEventHandler;
  onMouseEnter?: React.MouseEventHandler;
}

interface BasePopoutChildrenState {
  isShown: boolean;
  position: PopoutPositions;
}

interface ReferencePositionLayerProps {
  closePopout: () => void;
  isPositioned: boolean;
  nudge: number;
  position: PopoutPositions;
  setPopoutRef: (ref: HTMLElement | null) => void;
  updatePosition: () => void;
}

interface PopoutProps {
  align?: PopoutAlign;
  animation?: string;
  animationPosition?: string;
  autoInvert?: boolean;
  children: (
    baseProps: BasePopoutChildrenProps,
    baseState: BasePopoutChildrenState,
  ) => React.ReactNode;
  closeOnScroll?: boolean;
  disablePointerEvents?: boolean;
  fixed?: boolean;
  ignoreModalClicks?: boolean;
  layerContext?: React.Context<unknown>;
  nudgeAlignIntoViewport?: boolean;
  onRequestClose?: () => void;
  onRequestOpen?: () => void;
  onShiftClick?: React.MouseEventHandler;
  position?: PopoutPositions;
  positionKey?: string;
  preload?: () => void;
  renderPopout?: (props: ReferencePositionLayerProps) => React.ReactNode;
  shouldShow?: boolean;
  spacing?: number;
  useMouseEnter?: boolean;
}

export type PopoutType = React.ComponentClass<PopoutProps> & {
  defaultProps: PopoutProps;
  Animation: Record<"NONE" | "TRANSLATE" | "SCALE" | "FADE", string>;
};

export default await webpack
  .waitForModule<Record<string, PopoutType>>(
    webpack.filters.bySource(/ignoreModalClicks,.{1,4}closeOnScroll/),
  )
  .then(
    (mod) =>
      Object.values(mod).find(
        (x) => "defaultProps" in x && "nudgeAlignIntoViewport" in x.defaultProps,
      )!,
  );
