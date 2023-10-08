import { cfg } from "@utils/PluginSettingsUtils";
import type React from "react";
import { common, components, util } from "replugged";

const { i18n } = common;
const { SwitchItem } = components;

export default (): React.ReactElement => {
  const clearOnCancel = util.useSetting(cfg, "clearOnCancel");

  return (
    <SwitchItem {...clearOnCancel}>
      {i18n.Messages.EDITMESSAGEATTACHMENTS_SETTINGS_CLEAR_ON_CANCEL_TITLE}
    </SwitchItem>
  );
};
