import { BitFieldResolvable, Client, GatewayIntentsString, Message } from "discord.js";
import ICommand from "../../interfaces/ICommand";
import { CommandType } from "../../types/CommandType";


export default abstract class AbstractAdminCommand implements ICommand {
    public abstract name: string;
    public abstract description: string;
    public abstract intents: BitFieldResolvable<GatewayIntentsString, number>;

    public readonly TYPE: CommandType = "ADMIN";

    public abstract init(client: Client): Promise<void>;
    public abstract execute(payload: Message): Promise<void>;
    public abstract shutdown(client: Client): Promise<void>;
}