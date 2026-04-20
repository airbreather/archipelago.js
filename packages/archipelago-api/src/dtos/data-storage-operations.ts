import type { AddDataStorageOperation } from './add-data-storage-operation';
import type { AndDataStorageOperation } from './and-data-storage-operation';
import type { CeilingDataStorageOperation } from './ceiling-data-storage-operation';
import type { DefaultDataStorageOperation } from './default-data-storage-operation';
import type { FloorDataStorageOperation } from './floor-data-storage-operation';
import type { LeftShiftDataStorageOperation } from './left-shift-data-storage-operation';
import type { MaxDataStorageOperation } from './max-data-storage-operation';
import type { MinDataStorageOperation } from './min-data-storage-operation';
import type { ModuloDataStorageOperation } from './modulo-data-storage-operation';
import type { MultiplyDataStorageOperation } from './multiply-data-storage-operation';
import type { OrDataStorageOperation } from './or-data-storage-operation';
import type { PopDataStorageOperation } from './pop-data-storage-operation';
import type { PowerDataStorageOperation } from './power-data-storage-operation';
import type { RemoveDataStorageOperation } from './remove-data-storage-operation';
import type { ReplaceDataStorageOperation } from './replace-data-storage-operation';
import type { RightShiftDataStorageOperation } from './right-shift-data-storage-operation';
import type { UpdateDataStorageOperation } from './update-data-storage-operation';
import type { XorDataStorageOperation } from './xor-data-storage-operation';

/**
 * A union of all possible DataStorages. An operation manipulates or alters the value of a key in the data
 * storage. If the operation transforms the value from one state to another then the current value of the key is used
 * as the starting point otherwise the {@link SetPacket}'s default is used if the key does not exist on the server
 * already.
 *
 * Each operation object consists of an object containing both the operation to be applied, provided in the form of a
 * `string`, and the `value` to be used for that operation,
 * @remarks See each DataStorage subtype for more details.
 * @example
 * ```json
 * { "operation": "add", "value": 12 }
 * ```
 * @category DataStorage
 */
export type DataStorageOperation =
	| ReplaceDataStorageOperation
	| DefaultDataStorageOperation
	| AddDataStorageOperation
	| MultiplyDataStorageOperation
	| PowerDataStorageOperation
	| ModuloDataStorageOperation
	| FloorDataStorageOperation
	| CeilingDataStorageOperation
	| MaxDataStorageOperation
	| MinDataStorageOperation
	| AndDataStorageOperation
	| OrDataStorageOperation
	| XorDataStorageOperation
	| LeftShiftDataStorageOperation
	| RightShiftDataStorageOperation
	| RemoveDataStorageOperation
	| PopDataStorageOperation
	| UpdateDataStorageOperation;
