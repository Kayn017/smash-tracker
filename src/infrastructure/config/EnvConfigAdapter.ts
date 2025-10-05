import dotenv from "dotenv";
import { ConfigSchema } from "./schema";
import { Config, ConfigPort } from "../../domain/config/ConfigPort";

dotenv.config();

export class EnvConfigAdapter implements ConfigPort {
    private readonly config: Config;

    constructor() {
        const parsed = ConfigSchema.safeParse(process.env);

        if (!parsed.success) {
            let message = "❌ Invalid environment configuration\n";

            for (const issue of parsed.error.issues) {
                message += `  - ${issue.path.join(".")}: ${issue.message}\n`;
            }

            throw new Error(message);
        }

        this.config = parsed.data;
    }

    get<K extends keyof Config>(key: K): Config[K] {
        return this.config[key];
    }

    getAll(): Config {
        return this.config;
    }
}