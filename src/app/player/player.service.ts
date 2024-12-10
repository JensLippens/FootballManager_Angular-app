import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Player } from './player.model';
import { Position } from './position.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private baseUrl = environment.apiUrl
  private fullUrl = `${this.baseUrl}/api/players`;

  constructor(private http: HttpClient) { }

  getAllPlayers(pageNumber: number, pageSize: number, searchQuery?: string, position?: Position): Observable<HttpResponse<Player[]>> {
    let params = new HttpParams();

    // Conditionally add parameters if they are provided (not null or undefined)
    if (searchQuery != null) {
      params = params.set('searchQuery', searchQuery.toString());
    }
    if (position != null) {
      params = params.set('position', position.toString());
    }
    params = params.set('pageNumber', pageNumber.toString());
    params = params.set('pageSize', pageSize.toString());
     
    return this.http.get<Player[]>(`${this.fullUrl}`, {
      params: params,
      observe: 'response' 
    })
  }
}
