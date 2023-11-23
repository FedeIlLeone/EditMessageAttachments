import { DraftType } from "@stores/UploadAttachmentStore";
import UploaderUtils from "@utils/UploaderUtils";
import type React from "react";
import type { CloudUpload } from "./CloudUpload";

export type * from "./CloudUpload";
export type * from "./CloudUploader";
export type * from "./Upload";

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

interface ParsedMessage {
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
  children: Array<{ text: string }>;
  type: string;
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
  onChange: (channelId: string, value: string, richValue: RichValue[]) => void;
  onConfirmDelete: (channel: Channel, message: Message, showContextMenuHint?: boolean) => void;
  richValue: RichValue[];
  saveMessage: (channelId: string, messageId: string, message: ParsedMessage) => Promise<void>;
  textValue: string;
  validateEdit: (options: ValidateEditOptions) => ValidateEditResponse;
}

interface AllowedMentions {
  parse?: Array<"users" | "roles" | "everyone">;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  replied_user?: boolean;
}

export interface EditedMessageData {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  allowed_mentions: AllowedMentions;
  channelId: string;
  content: string;
  messageId: string;
}

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

export interface ChatInputType {
  analyticsName: string;
  drafts: {
    autosave?: boolean;
    type: DraftType;
  };
  submit?: {
    allowEmptyMessage?: boolean;
    button?: boolean;
    clearOnSubmit?: boolean;
    disableEnterToSubmit?: boolean;
    ignorePreference?: boolean;
    useDisabledStylesOnSubmit?: boolean;
  };
  /** Not typed */
  [index: string]: unknown;
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
  emojiPickerCloseOnModalOuterClick?: boolean;
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
  parentModalKey?: string;
  pendingReply?: PendingReply;
  placeholder?: string;
  promptToUpload?: (typeof UploaderUtils)["promptToUpload"];
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
  type: ChatInputType;
}

export type ChannelTextAreaContainerType = React.MemoExoticComponent<
  React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.PropsWithChildren<ChannelTextAreaContainerProps>> &
      React.RefAttributes<unknown>
  > & {
    render: React.ForwardRefRenderFunction<unknown, ChannelTextAreaContainerProps>;
  }
>;
