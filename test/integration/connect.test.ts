import { afterAll, describe, expect, test } from "vitest";

import { Client } from "../../src";

(globalThis as { WebSocket: typeof WebSocket }).WebSocket = WebSocket;

describe("smoke tests", () => {
    const client = new Client();
    afterAll(() => client.socket.disconnect());

    test("smoke test", { tags: ["integration"] }, async () => {
        const url = "ws://localhost:38281";
        const slotName = "APQuestPlayer";

        expect(await client.login(url, slotName, "APQuest")).not.toBeFalsy();

        const unlikelyMessage = "it is unlikely that someone would send this message especially with this speling error";

        const messageReceived = new Promise<void>((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error("Timeout waiting for message response"));
            }, 5000);

            client.messages.on("message", (text) => {
                if (text.includes(unlikelyMessage)) {
                    clearTimeout(timeout);
                    resolve();
                }
            });
        });

        await client.messages.say(unlikelyMessage);
        await messageReceived;
    });
});
