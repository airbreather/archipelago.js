import type { JSONValue } from '../json-value';

/**
 * Dict only: Updates the dictionary with the specified elements given in `value` creating new keys, or updating old
 * ones if they previously existed.
 * @see {@link DataStorageOperation} for all possible operation subtypes.
 * @category DataStorage
 */
export interface UpdateDataStorageOperation {
	operation: 'update';

	/** A value for the operation to apply against the current data storage value. */
	value: JSONValue;
}
