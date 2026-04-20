import type { JSONValue } from '../json-value';

/**
 * List only: removes the first instance of `value` found in the list.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface RemoveDataStorageOperation {
	operation: 'remove';

	/** A value for the operation to apply against the current data storage value. */
	value: JSONValue;
}
