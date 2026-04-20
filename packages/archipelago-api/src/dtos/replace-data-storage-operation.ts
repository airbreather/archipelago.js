import type { JSONValue } from '../json-value';

/**
 * Sets the current value of the key to `value`.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface ReplaceDataStorageOperation {
	operation: 'replace';

	/** A value for the operation to apply against the current data storage value. */
	value: JSONValue;
}
