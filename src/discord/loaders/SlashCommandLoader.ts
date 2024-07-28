import { Client } from "discord.js";
import AbstractSlashCommands from "../commands/slashcommands/AbstractSlashCommands";
import PingCommand from "../commands/slashcommands/PingCommand";
import ICommandLoader from "../interfaces/ICommandLoader";
import IConfigManager from "../../infrastructure/interfaces/IConfigManager";


export default class SlashCommandLoader implements ICommandLoader {
    public config: IConfigManager;
    public commands: AbstractSlashCommands[] = [
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
            await command.init(client);
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