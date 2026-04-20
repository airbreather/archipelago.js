import type { BouncePacket } from './bounce';
import type { ConnectPacket } from './connect';
import type { ConnectUpdatePacket } from './connect-update';
import type { CreateHintsPacket } from './create-hints';
import type { GetPacket } from './get';
import type { GetDataPackagePacket } from './get-data-package';
import type { LocationChecksPacket } from './location-checks';
import type { LocationScoutsPacket } from './location-scouts';
import type { SayPacket } from './say';
import type { SetPacket } from './set';
import type { SetNotifyPacket } from './set-notify';
import type { StatusUpdatePacket } from './status-update';
import type { SyncPacket } from './sync';
import type { UpdateHintPacket } from './update-hint';

export type ClientPacket =
	| BouncePacket
	| CreateHintsPacket
	| ConnectPacket
	| ConnectUpdatePacket
	| GetPacket
	| GetDataPackagePacket
	| LocationChecksPacket
	| LocationScoutsPacket
	| SayPacket
	| SetPacket
	| SetNotifyPacket
	| StatusUpdatePacket
	| SyncPacket
	| UpdateHintPacket;
