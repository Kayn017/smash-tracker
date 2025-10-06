import type { TournamentDetails, TournamentSummary } from "./types";

export interface TournamentProviderPort {
  readonly key: string;

  searchTournaments(query: string, limit?: number): Promise<TournamentSummary[]>;
  // getTournamentById(id: string): Promise<TournamentDetails | null>;
}