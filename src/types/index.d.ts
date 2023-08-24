import type { Channel, Message } from "discord-types/general";

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
