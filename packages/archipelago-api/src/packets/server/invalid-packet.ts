import type { InvalidArgumentsPacket } from './invalid-arguments-packet.ts';
import type { InvalidCommandPacket } from './invalid-command-packet.ts';

/**
 * A union of possible `InvalidPacket` packets. Sent to clients if the server caught a problem with a packet. See each
 * packet subtype for more details.
 * @remarks This only occurs for errors that are explicitly checked for. All other errors will cause the server to drop
 * the connection instead.
 * @category Network Packets
 */
export type InvalidPacket = InvalidCommandPacket | InvalidArgumentsPacket;
