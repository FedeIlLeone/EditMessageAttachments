import { webpack } from "replugged";
import type { PersistedStore } from "replugged/dist/renderer/modules/common/flux";

interface AccessibilityState {
  alwaysShowLinkDecorations: boolean;
  colorblindMode: boolean;
  contrast: number;
  desaturateUserColors: boolean;
  fontSize: number;
  forcedColorsModalSeen: boolean;
  keyboardModeEnabled: boolean;
  keyboardNavigationExplainerModalSeen: boolean;
  lowContrastMode: boolean;
  messageGroupSpacing: number | null;
  prefersReducedMotion: "auto" | "no-preference" | "reduce";
  roleStyle: "username" | "dot" | "hidden";
  saturation: number;
  submitButtonEnabled: boolean;
  syncForcedColors: boolean;
  syncProfileThemeWithUserTheme: boolean;
  systemForcedColors: "active" | "none";
  systemPrefersContrast: "no-preference" | "more" | "less";
  systemPrefersCrossfades: boolean;
  systemPrefersReducedMotion: "no-preference" | "reduce";
  zoom: number;
}

export interface AccessibilityStore extends PersistedStore {
  getUserAgnosticState: () => AccessibilityState;

  get alwaysShowLinkDecorations(): boolean;
  get colorblindMode(): boolean;
  get contrast(): number;
  get desaturateUserColors(): boolean;
  get fontScale(): number;
  get fontScaleClass(): string;
  get fontSize(): number;
  get forcedColorsModalSeen(): boolean;
  get isFontScaledDown(): boolean;
  get isFontScaledUp(): boolean;
  get isMessageGroupSpacingDecreased(): boolean;
  get isMessageGroupSpacingIncreased(): boolean;
  get isSubmitButtonEnabled(): boolean;
  get isZoomedIn(): boolean;
  get isZoomedOut(): boolean;
  get keyboardModeEnabled(): boolean;
  get keyboardNavigationExplainerModalSeen(): boolean;
  get lowContrastMode(): boolean;
  get messageGroupSpacing(): number;
  get rawPrefersReducedMotion(): "auto" | "no-preference" | "reduce";
  get roleStyle(): "username" | "dot" | "hidden";
  get saturation(): number;
  get syncForcedColors(): boolean;
  get syncProfileThemeWithUserTheme(): boolean;
  get systemForcedColors(): "active" | "none";
  get systemPrefersContrast(): "no-preference" | "more" | "less";
  get systemPrefersCrossfades(): boolean;
  get systemPrefersReducedMotion(): "no-preference" | "reduce";
  get useForcedColors(): boolean;
  get useReducedMotion(): boolean;
  get zoom(): number;
}

export default webpack.getByStoreName<AccessibilityStore>("AccessibilityStore")!;
