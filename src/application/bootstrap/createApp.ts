import { SapphireClient } from "@sapphire/framework";
import { ConfigPort } from "../../domain/config/ConfigPort";
import { GatewayIntentBits } from "discord.js";
import path from 'path';


export async function createApp(config: ConfigPort) {
    const client = new SapphireClient({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
        baseUserDirectory: path.resolve(__dirname, '../')
    });

    await client.login(config.get("DISCORD_TOKEN"));
    return client;
}