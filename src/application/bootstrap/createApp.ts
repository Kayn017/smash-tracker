import { LogLevel, SapphireClient } from "@sapphire/framework";
import { ConfigPort } from "../../domain/config/ConfigPort";
import { GatewayIntentBits } from "discord.js";
import path from 'path';
import { SmashTrackerClient } from "../SmashTrackerClient";


export async function createApp(config: ConfigPort) {
    const client = new SmashTrackerClient({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
        baseUserDirectory: path.resolve(__dirname, '../'),
        logger: {
            level: config.get("NODE_ENV") === "development" ? LogLevel.Debug : LogLevel.Info
        }
    }, 
    config);

    await client.login(config.get("DISCORD_TOKEN"));

    return client;
}