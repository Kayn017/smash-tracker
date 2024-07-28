import { Client } from 'discord.js';
import ICommandLoader from './interfaces/ICommandLoader';
import SlashCommandLoader from './loaders/SlashCommandLoader';
import EnvConfigManager from '../infrastructure/config/EnvConfigManager';
import AdminCommandLoader from './loaders/AdminCommandLoader';
import IConfigManager from '../infrastructure/interfaces/IConfigManager';
import PinoLogger, { ILogger } from '../infrastructure/Logger';

export default class Bot {
    public logger: ILogger;
    
    private client: Client;
    private configManagers: IConfigManager[];
    private commandLoaders: ICommandLoader[];

    private static instance: Bot;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new Bot();
        }

        return this.instance;
    }

    private constructor() {
        this.configManagers = [
            new EnvConfigManager()
        ];

        this.logger = new PinoLogger(this.configManagers[0]);

        this.logger.info('Bot is starting...');
        
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
            this.logger.info(`Logged in as ${this.client.user?.tag}`);
            
            this.commandLoaders.forEach(cl => cl.load(this.client));
        });

        this.client.login(this.configManagers[0].get<string>('DISCORD_TOKEN'));

    }
}