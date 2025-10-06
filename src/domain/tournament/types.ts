export interface TournamentSummary {
    id: string;
    name: string;
    date: string;
    url: string;
    provider: string;
}

export interface TournamentDetails extends TournamentSummary {
    // TODO : entrants, events
}