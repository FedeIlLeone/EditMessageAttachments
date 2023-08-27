import UploadMixin from "@mixins/UploadMixin";
import type { Channel, Message } from "discord-types/general";
import type React from "react";
import type { CloudUpload } from "./CloudUpload";

export type { CloudUpload } from "./CloudUpload";

interface Emoji {
  allNamesString: string;
  animated?: boolean;
  available?: boolean;
  guildId: string;
  id: string;
  managed?: boolean;
  name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  require_colons?: boolean;
  roles?: string[];
  url: string;
}

interface OutgoingMessage {
  content: string;
  invalidEmojis?: Emoji[];
  tts?: boolean;
  validNonShortcutEmojis: Emoji[];
}

interface ValidateEditOptions {
  channel: Channel;
  value: string;
}

interface ValidateEditResponse {
  failureReason?: string;
  valid: boolean;
}

export interface RichValue {
  type: string;
  children: Array<{ text: string }>;
}

interface MessageEditorInnerProps {
  message: Message;
  onChange: (unknown: null, value: string, richValue: RichValue[]) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>;
  onSubmit: (value: string) => void;
  richValue: RichValue[];
  textValue: string;
}

export interface MessageEditorProps {
  channel: Channel;
  children: (props: MessageEditorInnerProps) => React.ReactElement;
  className?: string;
  message: Message;
  onCancel: (channelId: string, response?: Record<string, unknown>) => void;
  onConfirmDelete: (channel: Channel, message: Message, showContextMenuHint?: boolean) => void;
  richValue: RichValue[];
  saveMessage: (channelId: string, messageId: string, message: OutgoingMessage) => Promise<void>;
  textValue: string;
  validateEdit: (options: ValidateEditOptions) => ValidateEditResponse;
}

interface DisableableChannelAttachmentAreaProps {
  canAttachFiles: boolean;
  channelId: string;
  type: Record<string, unknown>;
}

type DisableableChannelAttachmentAreaType = React.FC<DisableableChannelAttachmentAreaProps>;
export type MemoDisableableChannelAttachmentAreaType =
  React.MemoExoticComponent<DisableableChannelAttachmentAreaType>;

interface PendingReply {
  channel: Channel;
  message: Message;
  shouldMention: boolean;
  showMentionToggle: boolean;
}

interface SendMessageOptions {
  /** Not typed */
  command?: unknown;
  /** Not typed */
  commandOptionValues?: unknown;
  isGif?: boolean;
  stickers: string[];
  uploads?: CloudUpload[];
  value: string;
}

interface SendMessageResponse {
  shouldClear: boolean;
  shouldRefocus: boolean;
}

interface ChannelTextAreaContainerProps {
  "aria-describedby"?: string;
  "aria-labelledby"?: string;
  accessibilityLabel?: string;
  allowNewLines?: boolean;
  autoCompletePosition?: "bottom" | "top" | "left" | "right" | "center" | "window_center";
  canMentionChannels?: boolean;
  canMentionRoles?: boolean;
  channel: Channel;
  characterCountClassName?: string;
  className?: string;
  disabled?: boolean;
  disableThemedBackground?: boolean;
  focused: boolean;
  highlighted?: boolean;
  id?: string;
  innerClassName?: string;
  maxCharacterCount?: number;
  onBlur?: React.FocusEventHandler<HTMLDivElement | HTMLTextAreaElement>;
  onChange?: (unknown: null, value: string, richValue: RichValue[]) => void;
  onFocus?: React.FocusEventHandler<HTMLDivElement | HTMLTextAreaElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement | HTMLTextAreaElement>;
  onResize?: (size: number) => void;
  onSubmit: (options: SendMessageOptions) => Promise<SendMessageResponse>;
  pendingReply?: PendingReply;
  placeholder?: string;
  promptToUpload?: (typeof UploadMixin)["promptToUpload"];
  renderApplicationCommandIcon?: (
    /** Not typed */
    command: unknown,
    /** Not typed */
    section: unknown,
    className: string,
  ) => React.ReactElement;
  renderAttachButton?: (
    canShowPremiumTutorial: boolean,
    canOnlyUseTextCommands: boolean,
    channel: Channel,
  ) => React.ReactElement;
  required?: boolean;
  richValue: RichValue[];
  setEditorRef?: (
    /** Not typed */
    ref: unknown,
  ) => void;
  textValue: string;
  type: Record<string, unknown>;
}

type ChannelTextAreaContainerType = React.ForwardRefExoticComponent<
  React.PropsWithChildren<ChannelTextAreaContainerProps>
> & {
  render: React.ForwardRefRenderFunction<unknown, ChannelTextAreaContainerProps>;
};
export type MemoChannelTextAreaContainerType =
  React.MemoExoticComponent<ChannelTextAreaContainerType>;
