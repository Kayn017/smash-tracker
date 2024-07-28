import pino from 'pino';
import IConfigManager from './interfaces/IConfigManager';

export interface ILogger {
    debug(message: string): void;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
}

export default class PinoLogger implements ILogger {
    private pino: pino.Logger;

    constructor(config: IConfigManager) {
        if(!config.get<string>('APP_NAME')) {
            throw new Error('APP_NAME is not defined in the configuration');
        }

        if(!config.get<string>('APP_LOG_LEVEL')) {
            throw new Error('APP_LOG_LEVEL is not defined in the configuration');
        }

        // Pino logger initialization
        this.pino = pino({
            name : config.get<string>('APP_NAME'),
            level: config.get<string>('APP_LOG_LEVEL'),
        });
    }

    debug(message: string): void {
        this.pino.debug(message);
    }
    info(message: string): void {
        this.pino.info(message);
    }
    warn(message: string): void {
        this.pino.warn(message);
    }
    error(message: string): void {
        this.pino.error(message);
    }
    fatal(message: string): void {
        this.pino.fatal(message);
    }
    
}