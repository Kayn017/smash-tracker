import { BitFieldResolvable, Client, CommandInteraction, GatewayIntentsString, SlashCommandBuilder } from "discord.js";
import ICommand from "../../interfaces/ICommand";
import { CommandType } from "../../types/CommandType";


export default abstract class AbstractSlashCommands implements ICommand {
    public abstract name: string;
    public abstract description: string;
    public abstract intents: BitFieldResolvable<GatewayIntentsString, number>;

    public readonly TYPE: CommandType = "SLASH";

    public abstract init(client: Client): Promise<void>;
    public abstract execute(payload: CommandInteraction): Promise<void>;
    public abstract shutdown(client: Client): Promise<void>;
    
    public getSlashCommandBuilder(): SlashCommandBuilder {
        const cmd = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.description);

        // TODO : Add options

        return cmd;
    }
}