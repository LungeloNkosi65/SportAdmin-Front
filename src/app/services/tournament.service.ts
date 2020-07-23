import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament } from '../models/tournament';
import { ErrorhandlerService } from './errorhandler.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  rootUrl=environment.sportsApiUrl;
  paramp='Tournaments';
  tournamentId='?tournamentId=';
  paramGet='/GetAll';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private httpClinet:HttpClient,private errorHandlerService: ErrorhandlerService) { }

  getSingleTournament(tournamentId:number):Observable<Tournament>{
    return this.httpClinet.get<Tournament>(`${this.rootUrl}${this.paramp}${this.tournamentId}${tournamentId}`)
    .pipe(catchError(this.errorHandlerService.handleCrudError));
  }
  addTournamen(tournament:Tournament){
    return this.httpClinet.post(`${this.rootUrl}${this.paramp}`,tournament,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteTournament(tournamentId:number){
    return this.httpClinet.delete(`${this.rootUrl}${this.paramp}/delete${this.tournamentId}${tournamentId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  updateTournament(tournamentId:number,tournament:Tournament){
    return this.httpClinet.put(`${this.rootUrl}${this.paramp}${this.tournamentId}${tournamentId}`,tournament)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
  getTournaments():Observable<Tournament[]>{
    return this.httpClinet.get<Tournament[]>(`${this.rootUrl}${this.paramp}${this.paramGet}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

}
