import { settings } from "replugged";

interface Settings {
  hasSeenCTA?: boolean;
}

const defaultSettings = {
  hasSeenCTA: false,
} satisfies Partial<Settings>;

export const cfg = await settings.init<Settings, keyof typeof defaultSettings>(
  "dev.fedeilleone.EditMessageAttachments",
  defaultSettings,
);
