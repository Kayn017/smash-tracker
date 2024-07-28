import { CommandInteraction, IntentsBitField } from "discord.js";
import AbstractSlashCommands from "./AbstractSlashCommands";


export default class PingCommand extends AbstractSlashCommands {
    public name = "ping";
    public description = "Ping command";
    public intents = [IntentsBitField.Flags.GuildMessages];

    public async init(): Promise<void> {
        console.log("Ping command initialized");
    }

    public async execute(payload: CommandInteraction): Promise<void> {
        console.log("Ping command executed");
        await payload.reply("Pong!");
    }

    public async shutdown(): Promise<void> {
        console.log("Ping command shutdown");
    }
}