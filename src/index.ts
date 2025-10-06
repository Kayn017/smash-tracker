import { createApp } from "./application/bootstrap/createApp";
import { EnvConfigAdapter } from "./infrastructure/config/EnvConfigAdapter";
import { SapphireLoggerAdapter } from "./infrastructure/logging/SapphireLoggerAdapter";


async function main() {
    const config = new EnvConfigAdapter();

    try {
        const app = await createApp(config);
    }
    catch (error) {
        throw new Error("Failed to start the application", { cause: error });
    }

    const logger = new SapphireLoggerAdapter();
    logger.info("🚀 Application started successfully");
}

main();
