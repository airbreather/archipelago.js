/**
 * This is a type union of all supported message types for denoting the intent of the message part. This can be used to
 * indicate special information which may be rendered differently depending on client.
 *
 * - `text`: Regular text content. This is also the default type and is often omitted.
 * - `player_id`: Player id of someone on your team, should be resolved to player Name.
 * - `player_name`: Player Name, could be a player within a multiplayer game or from another team, not id resolvable.
 * - `item_id`: Item id, should be resolved to an item name.
 * - `item_name`: Item name, not currently used over network, but supported by reference clients.
 * - `location_id`: Location id, should be resolved to a location name.
 * - `location_name`: Location name, not currently used over network, but supported by reference clients.
 * - `entrance_name`: Entrance name. No id mapping exists.
 * - `color`: Regular text that should be colored. Only type that will contain color data.
 */
export type ValidJSONMessagePartType =
	| 'text'
	| 'player_id'
	| 'player_name'
	| 'item_id'
	| 'item_name'
	| 'location_id'
	| 'location_name'
	| 'entrance_name'
	| 'hint_status'
	| 'color';
