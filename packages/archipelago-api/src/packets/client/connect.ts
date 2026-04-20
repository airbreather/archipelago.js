import type { NetworkVersion } from '../../dtos';

/**
 * Sent by the client to authenticate a connection to an Archipelago session.
 * @category Network Packets
 */
export interface ConnectPacket {
	cmd: 'Connect';

	/** If the game session requires a password, it should be passed here. */
	password: string;

	/** The name of the game the client is playing. */
	game: string;

	/** The slot name for this client. */
	name: string;

	/** Unique identifier for player client. */
	uuid: string;

	/** Denotes special features or capabilities that the sender is currently capable of. */
	tags: string[];

	/** An object representing the minimum Archipelago server version this client supports. */
	version: NetworkVersion;

	/**
	 * Bit flags configuring which items should be sent by the server. See {@link itemsHandling} for information
	 * on individual flags.
	 */
	items_handling: number;

	/** If `true`, the {@link ConnectedPacket} will contain slot data. */
	slot_data: boolean;
}
