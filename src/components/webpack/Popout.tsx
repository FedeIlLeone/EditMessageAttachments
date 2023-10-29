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

interface BasePopoutProps {
  align?: PopoutAlign;
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
  loadingComponent?: React.ReactNode;
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

interface BasePopoutState {
  isLoading: boolean;
  renderedPosition: PopoutPositions | undefined;
  resizeKey: number;
  shouldShowLoadingState: boolean;
  shouldShowPopout: boolean;
}

/** Not typed */
export declare class BasePopout extends React.Component<BasePopoutProps, BasePopoutState> {}

interface ReferencePositionLayerProps {
  closePopout: () => void;
  isPositioned: boolean;
  nudge: number;
  position: PopoutPositions;
  setPopoutRef: (ref: HTMLElement | null) => void;
  updatePosition: () => void;
}

interface PopoutProps extends BasePopoutProps {
  animation?: string;
  animationPosition?: string;
}

export declare class Popout extends React.Component<PopoutProps> {
  private _ref: React.RefObject<BasePopout>;

  public renderPopout: (props: ReferencePositionLayerProps) => React.ReactElement;
}

export type PopoutType = typeof Popout & {
  Animation: Record<"NONE" | "TRANSLATE" | "SCALE" | "FADE", string>;
};

const components = await webpack.waitForProps<Record<"Popout", PopoutType>>("Popout");

export default components.Popout;
