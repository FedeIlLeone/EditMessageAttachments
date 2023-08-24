import type { RichValue } from "@types";
import type { Message } from "discord-types/general";
import { webpack } from "replugged";
import type { Store } from "replugged/dist/renderer/modules/common/flux";

export interface EditMessageStore extends Store {
  getEditingMessage: (channelId: string) => Message | null;
  getEditingMessageId: (channelId: string) => string | undefined;
  getEditingRichValue: (channelId: string) => RichValue[] | undefined;
  getEditingTextValue: (channelId: string) => string | undefined;
  isEditing: (channelId: string, messageId: string) => boolean;
  isEditingAny: (channelId: string) => boolean;
}

export default webpack.getByStoreName<EditMessageStore>("EditMessageStore")!;
