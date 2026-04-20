import type { Item as NetworkItem } from '@airbreather/archipelago-api';
import { itemClassification } from '@airbreather/archipelago-api/constants';

import { Client } from './Client';
import { Player } from './Player';

/**
 * An abstraction of {@link NetworkItem} that exposes additional helper methods and accessors for this item data.
 */
export class Item {
	readonly #client: Client;
	readonly #item: NetworkItem;
	readonly #sender: Player;
	readonly #receiver: Player;

	/**
	 * Instantiates a new ItemMetadata.
	 * @internal
	 * @param client The Archipelago client associated with this manager.
	 * @param item The network item data from the network protocol.
	 * @param sender The player to send this item.
	 * @param receiver The player to receive this item.
	 */
	public constructor(client: Client, item: NetworkItem, sender: Player, receiver: Player) {
		this.#client = client;
		this.#item = item;
		this.#sender = sender;
		this.#receiver = receiver;
	}

	/** @returns the name of this item. */
	public toString(): string {
		return this.name;
	}

	/** @returns the metadata for the player who receives this item. */
	get receiver(): Player {
		return this.#receiver;
	}

	/** @returns the metadata for the player who finds this item. */
	get sender(): Player {
		return this.#sender;
	}

	/** @returns the name of this item. */
	public get name(): string {
		return this.#client.package.lookupItemName(this.game, this.#item.item, true);
	}

	/** @returns the integer id of this item. */
	public get id(): number {
		return this.#item.item;
	}

	/** @returns the name of the location where this item was contained. */
	public get locationName(): string {
		return this.#client.package.lookupLocationName(this.sender.game, this.#item.location, true);
	}

	/** @returns the id of the location where this item was contained. */
	public get locationId(): number {
		return this.#item.location;
	}

	/** @returns the game name for the location this item was contained. */
	public get locationGame(): string {
		return this.sender.game;
	}

	/** @returns the game name for this item. */
	public get game(): string {
		return this.receiver.game;
	}

	/** @returns `true` if this item is flagged as progression. */
	public get progression(): boolean {
		return (this.flags & itemClassification.progression) === itemClassification.progression;
	}

	/** @returns `true` if this item is flagged as useful. */
	public get useful(): boolean {
		return (this.flags & itemClassification.useful) === itemClassification.useful;
	}

	/** @returns `true` if this item is flagged as a trap. */
	public get trap(): boolean {
		return (this.flags & itemClassification.trap) === itemClassification.trap;
	}

	/** @returns `true` if this item has no special flags. */
	public get filler(): boolean {
		return this.flags === itemClassification.none;
	}

	/** @returns the item classification bitflags for this item. */
	public get flags(): number {
		return this.#item.flags;
	}
}
