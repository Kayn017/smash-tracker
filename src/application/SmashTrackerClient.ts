import { container, SapphireClient } from "@sapphire/framework";
import { ClientOptions } from "discord.js";
import { ConfigPort } from "../domain/config/ConfigPort";
import { TournamentProviderFactory } from "../infrastructure/tournament/TournamentProviderFactory";


export class SmashTrackerClient extends SapphireClient {
    public constructor(params: { 
      options: ClientOptions; 
      config: ConfigPort; 
      tournamentProviderFactory: TournamentProviderFactory 
    }) {
        container.config = params.config;
        container.tournamentProviderFactory = params.tournamentProviderFactory;
        
        super(params.options);
    }
}

declare module '@sapphire/pieces' {
  interface Container {
    config: ConfigPort;
    tournamentProviderFactory: TournamentProviderFactory;
  }
}