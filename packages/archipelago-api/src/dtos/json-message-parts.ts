import type { ColorJSONMessagePart } from './color-json-message-part';
import type { HintStatusJSONMessagePart } from './hint-status-json-message-part';
import type { ItemJSONMessagePart } from './item-json-message-part';
import type { LocationJSONMessagePart } from './location-json-message-part';
import type { TextJSONMessagePart } from './text-json-message-part';

/**
 * A union of all message node subtypes sent along with {@link PrintJSONPacket}, which can be reconstructed into a
 * legible message. Each node is intended to be read in the order provided in the packet.
 * @remarks See each subtype for more specific information.
 */
export type JSONMessagePart =
	| ItemJSONMessagePart
	| LocationJSONMessagePart
	| ColorJSONMessagePart
	| TextJSONMessagePart
	| HintStatusJSONMessagePart;
