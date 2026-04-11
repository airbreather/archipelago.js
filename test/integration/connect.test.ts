import { expect, test as baseTest } from "vitest";

import { Client } from "../../src";

export const test = baseTest
    // eslint-disable-next-line no-empty-pattern -- required for vitest
    .extend("client", ({}, { onCleanup }) => {
        const client = new Client();
        onCleanup(() => client.socket.disconnect());
        return client;
    });

test("smoke test", async ({ client }) => {
    const url = "ws://localhost:38281";
    const slotName = "Ratthew";

    await expect(client.login(url, slotName, "Autopelago")).resolves.not.toThrow();

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

    await expect(client.messages.say(unlikelyMessage)).resolves.not.toThrow();
    await expect(messageReceived).resolves.not.toThrow();
});
