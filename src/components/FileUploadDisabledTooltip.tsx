import Popout, { PopoutAlign, PopoutPositions } from "@components/webpack/Popout";
import UpsellTooltip from "@components/webpack/UpsellTooltip";
import EditMessageStore from "@stores/EditMessageStore";
import LayerStore from "@stores/LayerStore";
import { cfg } from "@utils/PluginSettingsUtils";
import { common } from "replugged";

const { flux: Flux, i18n, React } = common;

interface FileUploadDisabledTooltipProps {
  channelId: string;
  children: React.ReactElement;
}

export default (props: FileUploadDisabledTooltipProps): React.ReactElement | null => {
  const { channelId, children } = props;

  const [shouldShow, setShouldShow] = React.useState(true);

  const hasLayers = Flux.useStateFromStores([LayerStore], () => {
    return LayerStore.hasLayers();
  });
  const isEditing = Flux.useStateFromStores([EditMessageStore], () => {
    return EditMessageStore.isEditingAny(channelId);
  });

  const hasSeenCTA = cfg.get("hasSeenCTA");

  const renderChildren = (): React.ReactElement => children;

  return hasLayers ? (
    children
  ) : (
    <Popout
      renderPopout={() => (
        <div onClick={(event) => event.stopPropagation()}>
          <UpsellTooltip
            header={i18n.Messages.EDITMESSAGEATTACHMENTS_CTA_TOOLTIP_HEADER}
            content={i18n.Messages.EDITMESSAGEATTACHMENTS_CTA_TOOLTIP_CONTENT}
            buttonCTA={i18n.Messages.GOT_IT}
            onClick={() => {
              cfg.set("hasSeenCTA", true);
              setShouldShow(false);
            }}
            caretPosition={UpsellTooltip.CaretPosition.BOTTOM_CENTER}
          />
        </div>
      )}
      position={PopoutPositions.TOP}
      // TODO: Need to change the align dynamically, so it points to the button (if present)
      align={PopoutAlign.CENTER}
      animation={Popout.Animation.TRANSLATE}
      shouldShow={shouldShow && !hasSeenCTA && isEditing}>
      {renderChildren}
    </Popout>
  );
};
