import { Client } from "discord.js";
import AbstractAdminCommand from "../commands/admincommands/AbstractAdminCommand";
import PingAdminCommand from "../commands/admincommands/PingAdminCommand";
import ICommandLoader from "../interfaces/ICommandLoader";
import IConfigManager from "../../infrastructure/interfaces/IConfigManager";


export default class AdminCommandLoader implements ICommandLoader {
    public config: IConfigManager;

    public commands: AbstractAdminCommand[] = [
        new PingAdminCommand()
    ];

    constructor( config: IConfigManager ) {
        this.config = config;
    }

    public get intents() {
        return this.commands.flatMap(c => c.intents);
    }

    public load(client: Client): void {
        this.commands.forEach(async command => {
            await command.init(client);
        });

        const prefix = this.config.get<string>("DISCORD_PREFIX");

        if(!prefix) {
            throw new Error("DISCORD_PREFIX not found in config!");
        }

        client.on("messageCreate", async message => {
            if (!message.content.startsWith(prefix)) return;

            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const commandName = args.shift()?.toLowerCase();
            if (!commandName) return;

            const command = this.commands.find(c => c.name === commandName);
            if (!command) {
                throw new Error(`Command ${commandName} not found!`);
            }

            await command.execute(message);
        });
    }

    public unload(client: Client): void {
        this.commands.forEach(async command => {
            await command.shutdown(client);
        });
    }
}