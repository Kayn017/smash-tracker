import { CommandInteraction, IntentsBitField } from "discord.js";
import AbstractSlashCommand from "./AbstractSlashCommand";


export default class PingCommand extends AbstractSlashCommand {
    public name = "ping";
    public description = "Ping command";
    public intents = [IntentsBitField.Flags.GuildMessages];

    public async init(): Promise<void> {}

    public async execute(payload: CommandInteraction): Promise<void> {
        await payload.reply("Pong!");
    }

    public async shutdown(): Promise<void> {}
}