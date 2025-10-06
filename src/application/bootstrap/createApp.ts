import { LogLevel, SapphireClient } from "@sapphire/framework";
import { ConfigPort } from "../../domain/config/ConfigPort";
import { GatewayIntentBits } from "discord.js";
import path from 'path';
import { SmashTrackerClient } from "../SmashTrackerClient";
import { TournamentProviderFactory } from "../../infrastructure/tournament/TournamentProviderFactory";
import { StartGGTournamentProvider } from "../../infrastructure/tournament/startgg/StartGGTournamentProvider";


export async function createApp(config: ConfigPort) {
    const tournamentProviderFactory = new TournamentProviderFactory();

    tournamentProviderFactory.registerProvider(
        new StartGGTournamentProvider(
            config.get("STARTGG_API_URL"), 
            config.get("STARTGG_API_TOKEN")
        )
    );

    const client = new SmashTrackerClient({
        options: {
            intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
            baseUserDirectory: path.resolve(__dirname, '../'),
            logger: {
                level: config.get("NODE_ENV") === "development" ? LogLevel.Debug : LogLevel.Info
            }
        },
        config,
        tournamentProviderFactory
    });

    await client.login(config.get("DISCORD_TOKEN"));

    return client;
}
