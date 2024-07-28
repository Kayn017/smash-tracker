import { BitFieldResolvable, Client, GatewayIntentsString } from "discord.js";
import ICommand from "./ICommand";
import IConfigManager from "../../infrastructure/interfaces/IConfigManager";


export default interface ICommandLoader {
    config: IConfigManager;
    commands: ICommand[];
    intents: BitFieldResolvable<GatewayIntentsString, number>

    load(client: Client): void;
    unload(client: Client): void;
}