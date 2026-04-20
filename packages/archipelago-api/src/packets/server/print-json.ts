import type { AdminCommandResultJSONPacket } from './admin-command-result-json-packet.ts';
import type { ChatJSONPacket } from './chat-json-packet.ts';
import type { CollectJSONPacket } from './collect-json-packet.ts';
import type { CommandResultJSONPacket } from './command-result-json-packet.ts';
import type { CountdownJSONPacket } from './countdown-json-packet.ts';
import type { GoalJSONPacket } from './goal-json-packet.ts';
import type { HintJSONPacket } from './hint-json-packet.ts';
import type { ItemCheatJSONPacket } from './item-cheat-json-packet.ts';
import type { ItemSendJSONPacket } from './item-send-json-packet.ts';
import type { JoinJSONPacket } from './join-json-packet.ts';
import type { PartJSONPacket } from './part-json-packet.ts';
import type { ReleaseJSONPacket } from './release-json-packet.ts';
import type { ServerChatJSONPacket } from './server-chat-json-packet.ts';
import type { TagsChangedJSONPacket } from './tags-changed-json-packet.ts';
import type { TutorialJSONPacket } from './tutorial-json-packet.ts';

/**
 * A union of possible `PrintJSON` packets. Sent to clients purely to display a message to the player. While various
 * message types provide additional arguments, clients only need to evaluate the `data` argument to construct the
 * human-readable message text. All other arguments may be ignored safely.
 * @remarks Only some of these attributes are present on each subtype, see each subtype for more information.
 * @category Network Packets
 */
export type PrintJSONPacket =
	| ItemSendJSONPacket
	| ItemCheatJSONPacket
	| HintJSONPacket
	| JoinJSONPacket
	| PartJSONPacket
	| ChatJSONPacket
	| ServerChatJSONPacket
	| TutorialJSONPacket
	| TagsChangedJSONPacket
	| CommandResultJSONPacket
	| AdminCommandResultJSONPacket
	| GoalJSONPacket
	| ReleaseJSONPacket
	| CollectJSONPacket
	| CountdownJSONPacket;

/**
 * A union of all known {@link PrintJSONPacket} types.
 */
export type PrintJSONType =
	| 'ItemSend'
	| 'ItemCheat'
	| 'Hint'
	| 'Join'
	| 'Part'
	| 'Chat'
	| 'ServerChat'
	| 'Tutorial'
	| 'TagsChanged'
	| 'CommandResult'
	| 'AdminCommandResult'
	| 'Goal'
	| 'Release'
	| 'Collect'
	| 'Countdown';
