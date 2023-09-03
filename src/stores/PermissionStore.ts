import type { Channel, Guild, Role, User } from "discord-types/general";
import { webpack } from "replugged";
import type { Store } from "replugged/dist/renderer/modules/common/flux";

interface GuildPermissionProps {
  canManageBans: boolean;
  canManageChannels: boolean;
  canManageGuild: boolean;
  canManageGuildExpressions: boolean;
  canManageNicknames: boolean;
  canManageRoles: boolean;
  canManageWebhooks: boolean;
  canUseClydeAI: boolean;
  canViewAuditLog: boolean;
  canViewAuditLogV2: boolean;
  canViewGuildAnalytics: boolean;
  guild: Guild;
  isGuildAdmin: boolean;
  isOwner: boolean;
  isOwnerWithRequiredMfaLevel: boolean;
}

interface PartialChannelContext {
  channelId?: string;
}

interface PartialGuildContext {
  guildId?: string;
}

type Context = Channel | Guild | PartialChannelContext | PartialGuildContext;

export interface PermissionStore extends Store {
  can: (
    permission: bigint,
    context: Context,
    overwrites?: Channel["permissionOverwrites"],
    roles?: Record<string, Role>,
    excludeGuildPermissions?: boolean,
  ) => boolean;
  canAccessGuildSettings: (guild: Guild) => boolean;
  canBasicChannel: (
    permissions: number,
    channel: Channel,
    overwrites?: Channel["permissionOverwrites"],
    roles?: Record<string, Role>,
    excludeGuildPermissions?: boolean,
  ) => boolean;
  canImpersonateRole: (guild: Guild, role: Role) => boolean;
  canManageUser: (permission: bigint, user: User | string, guild: Guild) => boolean;
  canWithPartialContext: (
    permission: bigint,
    context: PartialChannelContext | PartialGuildContext,
  ) => boolean;
  computeBasicPermissions: (channel: Channel) => number;
  computePermissions: (
    context: Context,
    overwrites?: Channel["permissionOverwrites"],
    roles?: Record<string, Role>,
    excludeGuildPermissions?: boolean,
  ) => bigint;
  getChannelPermissions: (channel: Channel) => bigint;
  getChannelsVersion: () => number;
  getGuildPermissionProps: (guild: Guild) => GuildPermissionProps;
  getGuildPermissions: (guild: Guild) => bigint;
  getGuildVersion: (guildId: string) => number;
  getHighestRole: (guild: Guild) => Role | null;
  isRoleHigher: (guild: Guild, firstRole: Role | null, secondRole: Role | null) => boolean;
}

export default webpack.getByStoreName<PermissionStore>("PermissionStore")!;
