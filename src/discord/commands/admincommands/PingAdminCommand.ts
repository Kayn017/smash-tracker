import { IntentsBitField, Message } from "discord.js";
import AbstractAdminCommand from "./AbstractAdminCommand";


export default class PingAdminCommand extends AbstractAdminCommand{
    public name = "ping";
    public description = "Ping!";
    public intents = [IntentsBitField.Flags.DirectMessages];

    public async init(): Promise<void> {
        console.log("PingAdminCommand initialized!");
    }

    public async execute(payload: Message): Promise<void> {
        await payload.reply("Pong!");
    }

    public async shutdown(): Promise<void> {
        console.log("PingAdminCommand shutdown!");
    }
}