import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Standing } from './standing.model';


@Injectable({
  providedIn: 'root'
})
export class StandingService {
  private baseUrl = environment.apiUrl
  private fullUrl = `${this.baseUrl}/api/standings`;

  constructor(private http: HttpClient) {}

  // Fetch current standings
  getCurrentLeagueStandings(): Observable<Standing[]> {
    return this.http.get<Standing[]>(`${this.fullUrl}/current`);
  }

  // Fetch standings for a specific year
  getLeagueStandingsByYear(year: number): Observable<Standing[]> {
    return this.http.get<Standing[]>(`${this.fullUrl}/league/${year}`);
  }
}
