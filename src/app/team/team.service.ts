import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from './team.model';
//
@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private baseUrl = environment.apiUrl
  private fullUrl = `${this.baseUrl}/api/teams`;

  constructor(private http: HttpClient) {}

  // Fetch all teams
  getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.fullUrl}`);
  }

  // Fetch all teams for league
  getAllTeamsForSpecificLeague(year: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.fullUrl}/league/${year}`);
  }

  // Fetch one specific team
  getSpecificTeam(teamId: number): Observable<Team> {
    return this.http.get<Team>(`${this.fullUrl}/team/${teamId}`);
  }
}
