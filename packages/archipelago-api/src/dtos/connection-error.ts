/**
 * A union of known errors the Archipelago server can send back to the client when they receive a
 * {@link ConnectionRefusedPacket}.
 */
export type ConnectionError =
	| 'InvalidSlot'
	| 'InvalidGame'
	| 'IncompatibleVersion'
	| 'InvalidPassword'
	| 'InvalidItemsHandling';
