import { TournamentProviderPort } from "../../../domain/tournament/TournamentProviderPort";
import { TournamentSummary } from "../../../domain/tournament/types";


type GqlResponse<T> = { data: T; errors?: Array<{ message: string }> };

export class StartGGTournamentProvider implements TournamentProviderPort {
    readonly key = 'startgg';

    private readonly url: string;
    private readonly token: string;

    constructor(apiUrl: string, apiToken: string) {
        this.url = apiUrl;
        this.token = apiToken;
    }

    async searchTournaments(query: string, limit: number = 5): Promise<TournamentSummary[]> {
        if (!query?.trim()) return [];

        const gql = `
        query SearchTournaments($search: String!, $perPage: Int!) {
            tournaments(query: { perPage: $perPage, page: 1, filter: { name: $search } }) {
                nodes {
                    id
                    name
                    city
                }
            }
        }   
        `;

        const res = await this.post<GqlResponse<{
            tournaments: { nodes: Array<{
                id: number; name: string; city: string;
            }> }
        }>>(gql, { search: query, perPage: Math.min(Math.max(limit, 1), 25) });

        return res.data.tournaments.nodes.map(t => ({
            id: t.id.toString(),
            name: t.name,
            date: '', // TODO
            url: `https://start.gg/tournament/${t.id}`,
            provider: this.key,
        }));
    }

    private async post<T>(query: string, variables: Record<string, unknown>): Promise<T> {
        const res = await fetch(this.url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify({ query, variables })
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`start.gg API error: ${res.status} ${res.statusText} — ${text}`);
        }
        return res.json() as Promise<T>;
    }
}
