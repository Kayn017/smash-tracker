import { TournamentProviderPort } from "../../domain/tournament/TournamentProviderPort";

export class TournamentProviderFactory {
    private providers: Map<string, TournamentProviderPort> = new Map();

    registerProvider(provider: TournamentProviderPort): void {
        this.providers.set(provider.key, provider);
    }

    getProvider(key: string): TournamentProviderPort | undefined {
        return this.providers.get(key);
    }   

    getAllProviders(): TournamentProviderPort[] {
        return Array.from(this.providers.values())
    }
}