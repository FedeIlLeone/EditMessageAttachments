import { webpack } from "replugged";
import type { ChannelStore as ChannelStorePrototype } from "replugged/dist/renderer/modules/common/channels";
import type { Store } from "replugged/dist/renderer/modules/common/flux";

export interface ChannelStore extends ChannelStorePrototype, Store {}

export default webpack.getByStoreName<ChannelStore>("ChannelStore")!;
