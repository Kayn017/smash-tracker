import IConfigManager from "../interfaces/IConfigManager";
import "dotenv/config";

export default class EnvConfigManager implements IConfigManager {

    public get<T>(key: string): T {
        return process.env[key] as unknown as T;
    }

    public set<T>(key: string, value: T): void {
        process.env[key] = value as unknown as string;
    }

    public delete(key: string): void {
        delete process.env[key];
    }

    public save(): void {
        // Not needed
    }

    public load(): void {
        // Not needed
    }
}