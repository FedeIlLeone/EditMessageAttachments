import { webpack } from "replugged";
import type { Store } from "replugged/dist/renderer/modules/common/flux";

export interface LayerStore extends Store {
  getLayers: (channelId: string) => boolean;
  hasLayers: () => string[];
}

export default webpack.getByStoreName<LayerStore>("LayerStore")!;
