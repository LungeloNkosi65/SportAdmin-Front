import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sport } from '../Models/sport';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SportTreeService {
  rootUrl = environment.sportsApiUrl;
  param = 'sports'
  sportId = '?sportId='
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient) { }

  getSports():Observable<Sport[]>{
    return this.http.get<Sport[]>(`${this.rootUrl}${this.param}`)
  }
  getSIngleSport(sportId: number): Observable<Sport> {
    return this.http.get<Sport>(`${this.rootUrl}${this.param}${this.sportId}${sportId}`)
  }
  addSport(sport: Sport) {
   return this.http.post(`${this.rootUrl}${this.param}`,sport,this.httpOptions);
  }
  updateSport(sportId:number,sport:Sport){
    return this.http.put(`${this.rootUrl}${this.param}${this.sportId}${sportId}`,sport,this.httpOptions);
  }
  deleteSport(sportId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.sportId}${sportId}`,this.httpOptions);
  }
}
