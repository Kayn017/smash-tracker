import { container, SapphireClient } from "@sapphire/framework";
import { ClientOptions } from "discord.js";
import { ConfigPort } from "../domain/config/ConfigPort";


export class SmashTrackerClient extends SapphireClient {
    public constructor(options: ClientOptions, config: ConfigPort) {
        container.config = config;
        super(options);
    }
}

declare module '@sapphire/pieces' {
  interface Container {
    config: ConfigPort;
  }
}