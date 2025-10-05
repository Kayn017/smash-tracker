import { SapphireClient } from "@sapphire/framework";
import { ConfigPort } from "../../domain/config/ConfigPort";
import { GatewayIntentBits } from "discord.js";


export async function createApp(config: ConfigPort) {
    const client = new SapphireClient({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
    });

    await client.login(config.get("DISCORD_TOKEN"));
}