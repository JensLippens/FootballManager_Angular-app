import { Game } from "../game/game.model";
import { Team } from "../team/team.model";

export interface League {
    year: number;
    teams: Team[];
    games: Game[];
}