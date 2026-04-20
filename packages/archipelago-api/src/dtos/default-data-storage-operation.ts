/**
 * If the key has no value yet, sets the current value of the key to `default` of the {@link SetPacket}'s (`value` is
 * ignored).
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface DefaultDataStorageOperation {
	operation: 'default';

	/** A value for the operation to apply against the current data storage value. */
	value: null;
}
