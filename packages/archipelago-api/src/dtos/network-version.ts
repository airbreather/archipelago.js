/**
 * An object representing software versioning. Used in the {@link ConnectPacket} to allow the client to inform the
 * server the minimum Archipelago version it supports.
 * @remarks Archipelago does not follow a semver versioning standard.
 */
export interface NetworkVersion {
	/** The major component of the version number. (e.g., X.0.0) */
	major: number;
	/** The minor component of the version number. (e.g., 0.X.0) */
	minor: number;
	/** The build/patch component of the version number. (e.g., 0.0.X) */
	build: number;
}
