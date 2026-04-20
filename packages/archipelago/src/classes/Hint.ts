import type { Hint as NetworkHint, hintStatus } from '@airbreather/archipelago-api';

import { Client } from './Client';
import { Item } from './Item';

/**
 * An abstraction of {@link NetworkHint} that exposes additional helper methods and accessors received hint data.
 */
export class Hint {
	readonly #client: Client;
	readonly #hint: NetworkHint;
	readonly #item: Item;

	/**
	 * Instantiates a new ItemMetadata.
	 * @internal
	 * @param client The Archipelago client associated with this manager.
	 * @param hint The network hint object.
	 */
	public constructor(client: Client, hint: NetworkHint) {
		this.#client = client;
		this.#hint = hint;
		this.#item = new Item(
			this.#client,
			{ item: hint.item, location: hint.location, player: hint.finding_player, flags: hint.item_flags },
			this.#client.players.findPlayer(hint.finding_player)!,
			this.#client.players.findPlayer(hint.receiving_player)!,
		);
	}

	public updateStatus(status: typeof hintStatus[keyof typeof hintStatus]): void {
		this.#client.socket.send({
			cmd: 'UpdateHint',
			player: this.#hint.finding_player,
			location: this.#hint.location,
			status,
		});
	}

	/** @returns the item contained in this hint. */
	public get item(): Item {
		return this.#item;
	}

	/** @returns `true` if this item has been found. */
	public get found(): boolean {
		return this.#hint.found;
	}

	/** @returns the entrance this location is at if entrance data is available, otherwise `"Vanilla"`. */
	public get entrance(): string {
		return this.#hint.entrance || 'Vanilla';
	}

	public get status(): typeof hintStatus[keyof typeof hintStatus] {
		return this.#hint.status;
	}

	get uniqueKey(): string {
		return `${this.#item.sender.slot}-${this.#item.locationId}`;
	}

	static getUniqueKey(hint: NetworkHint): string {
		return `${hint.finding_player}-${hint.location}`;
	}
}
