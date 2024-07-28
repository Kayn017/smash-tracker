import { Client } from "discord.js";
import AbstractSlashCommand from "../commands/slashcommands/AbstractSlashCommand";
import PingCommand from "../commands/slashcommands/PingCommand";
import ICommandLoader from "../interfaces/ICommandLoader";
import IConfigManager from "../../infrastructure/interfaces/IConfigManager";
import Bot from "../Bot";


export default class SlashCommandLoader implements ICommandLoader {
    public config: IConfigManager;
    public commands: AbstractSlashCommand[] = [
        new PingCommand()
    ]

    public get intents() {
        return this.commands.flatMap(c => c.intents);
    }

    constructor(config: IConfigManager) {
        this.config = config;
    }

    public load(client: Client): void {
        this.commands.forEach(async command => {
            Bot.getInstance().logger.debug(`Initializing command ${command.name}...`);
            await command.init(client);
            Bot.getInstance().logger.debug(`Initialized command ${command.name}`);
        });

        client.on("interactionCreate", async interaction => {
            if (!interaction.isCommand()) return;

            const command = this.commands.find(c => c.name === interaction.commandName);
            if (!command) {
                throw new Error(`Command ${interaction.commandName} not found!`);
            };

            await command.execute(interaction);
        });
    }

    public unload(client: Client): void {
        this.commands.forEach(async command => {
            await command.shutdown(client);
        });
    }
}