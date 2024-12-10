import { Coach } from "../coach/coach.model";
import { Game } from "../game/game.model";
import { League } from "../league/league.model";
import { Player } from "../player/player.model";

export interface Team {
    id: number;
    name: string;
    coach: Coach;
    players: Player[];
    games: Game[];
    leagues: League[];
}

