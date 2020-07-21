import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament } from '../models/tournament';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  rootUrl=environment.sportsApiUrl;
  paramp='Tournaments';
  tournamentId='?tournamentId=';
  paramGet='/GetAll';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private httpClinet:HttpClient) { }

  getSingleTournament(tournamentId:number):Observable<Tournament>{
    return this.httpClinet.get<Tournament>(`${this.rootUrl}${this.paramp}${this.tournamentId}${tournamentId}`);
  }
  addTournamen(tournament:Tournament){
    return this.httpClinet.post(`${this.rootUrl}${this.paramp}`,tournament,this.httpOptions);
  }

  deleteTournament(tournamentId:number){
    return this.httpClinet.delete(`${this.rootUrl}${this.paramp}/delete${this.tournamentId}${tournamentId}`,this.httpOptions);
  }

  updateTournament(tournamentId:number,tournament:Tournament){
    return this.httpClinet.put(`${this.rootUrl}${this.paramp}${this.tournamentId}${tournamentId}`,tournamentId,this.httpOptions);
  }
  getTournaments():Observable<Tournament[]>{
    return this.httpClinet.get<Tournament[]>(`${this.rootUrl}${this.paramp}${this.paramGet}`);
  }

}
