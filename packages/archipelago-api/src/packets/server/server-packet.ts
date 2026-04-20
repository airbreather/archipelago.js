import type { BouncedPacket } from './bounced';
import type { ConnectedPacket } from './connected';
import type { ConnectionRefusedPacket } from './connection-refused';
import type { DataPackagePacket } from './data-package';
import type { InvalidPacket } from './invalid-packet';
import type { LocationInfoPacket } from './location-info';
import type { PrintJSONPacket } from './print-json';
import type { ReceivedItemsPacket } from './received-items';
import type { RetrievedPacket } from './retrieved';
import type { RoomInfoPacket } from './room-info';
import type { RoomUpdatePacket } from './room-update';
import type { SetReplyPacket } from './set-reply';

export type ServerPacket =
	| BouncedPacket
	| ConnectedPacket
	| ConnectionRefusedPacket
	| DataPackagePacket
	| InvalidPacket
	| LocationInfoPacket
	| PrintJSONPacket
	| ReceivedItemsPacket
	| RetrievedPacket
	| RoomInfoPacket
	| RoomUpdatePacket
	| SetReplyPacket;
