import { settings } from "replugged";

interface Settings {
  clearOnCancel?: boolean;
}

const defaultSettings = {
  clearOnCancel: true,
} satisfies Partial<Settings>;

export const cfg = await settings.init<Settings, keyof typeof defaultSettings>(
  "dev.fedeilleone.EditMessageAttachments",
  defaultSettings,
);
