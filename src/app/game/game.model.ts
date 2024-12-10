export interface Game {
    id: number;
    matchDay: number;
    homeTeamName: string;
    awayTeamName: string;
    homeTeamScore?: number | null;
    awayTeamScore?: number | null;
    score: string;
    date: Date;
    seasonYear: number;
}
