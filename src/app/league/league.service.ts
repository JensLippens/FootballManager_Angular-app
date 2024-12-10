import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { League } from './league.model';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {
  private baseUrl = environment.apiUrl
  private fullUrl = `${this.baseUrl}/api/leagues`;

  constructor(private http: HttpClient) {}

  getAllLeagues(): Observable<League[]> {
    return this.http.get<League[]>(`${this.fullUrl}`);
  }
}
