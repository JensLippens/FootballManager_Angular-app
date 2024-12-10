import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Game } from './game.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private baseUrl = environment.apiUrl
  private fullUrl = `${this.baseUrl}/api/games`;

  constructor(private http: HttpClient) { }

  // Fetch a set of geams for one season
  getAllGamesFromLeague(leagueYear: number): Observable<Game[]> {
    return this.http.get<Game[]>(`${this.fullUrl}/table/league/${leagueYear}`);
  }
  // Fetch a set of geams for one season
  getGamesFromLeague(leagueYear: number, pageNumber: number, pageSize: number): Observable<HttpResponse<Game[]>> {
    return this.http.get<Game[]>(`${this.fullUrl}/league/${leagueYear}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {observe: 'response'}
    );
  }

  // Fetch a set of games games from one team for one season
  getGamesFromLeagueForTeam(leagueYear: number, teamId: number, pageNumber: number, pageSize: number): Observable<HttpResponse<Game[]>> {
    return this.http.get<Game[]>(`${this.fullUrl}/league/${leagueYear}?teamId=${teamId}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
      {observe: 'response'}
    );
  }  

  // Fetch specific game
  getSpecificGame(gameId: number): Observable<Game> {
    return this.http.get<Game>(`${this.fullUrl}game/${gameId}`);
  }  
}


