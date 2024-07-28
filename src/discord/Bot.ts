import { Client } from 'discord.js';
import ICommandLoader from './interfaces/ICommandLoader';
import SlashCommandLoader from './loaders/SlashCommandLoader';
import EnvConfigManager from '../infrastructure/config/EnvConfigManager';
import AdminCommandLoader from './loaders/AdminCommandLoader';
import IConfigManager from '../infrastructure/interfaces/IConfigManager';

export default class Bot {
    private client: Client;
    private configManagers: IConfigManager[];
    private commandLoaders: ICommandLoader[];

    constructor() {
        this.configManagers = [
            new EnvConfigManager()
        ];
        
        this.commandLoaders = [
            new SlashCommandLoader(this.configManagers[0]),
            new AdminCommandLoader(this.configManagers[0])
        ];
        
        this.client = new Client({
            intents: this.commandLoaders.flatMap(cl => cl.intents),
        });
    }

    public async start() {
        this.client.once('ready', async () => {
            console.log(`Logged in as ${this.client.user?.tag}`);
            
            this.commandLoaders.forEach(cl => cl.load(this.client));
        });

        this.client.login(this.configManagers[0].get<string>('DISCORD_TOKEN'));

    }
}