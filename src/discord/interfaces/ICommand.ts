import { BitFieldResolvable, Client, GatewayIntentsString } from "discord.js";
import { CommandPayload } from "../types/CommandPayload";
import { CommandType } from "../types/CommandType";

export default interface ICommand {
    name: string;
    description: string;
    intents: BitFieldResolvable<GatewayIntentsString, number>;
    
    TYPE: CommandType;
    
    init(client: Client): Promise<void>;
    execute(payload: CommandPayload): Promise<void>;
    shutdown(client: Client): Promise<void>;
}