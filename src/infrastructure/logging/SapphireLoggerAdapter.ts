import "@sapphire/plugin-logger/register";
import { container } from "@sapphire/framework";
import type { LoggerPort } from "../../domain/logging/LoggerPort";

export class SapphireLoggerAdapter implements LoggerPort {
  private readonly logger = container.logger;

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string, error?: unknown): void {
    if (error instanceof Error) {
      this.logger.error(`${message} — ${error.message}`, { stack: error.stack });
    } else {
      this.logger.error(message);
    }
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}
