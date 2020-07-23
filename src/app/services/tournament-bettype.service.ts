import { Injectable } from '@angular/core';
import {TournamentBetType} from '../Models/tournamentBetType';
import {HttpClient} from '@angular/common/http';
import {ErrorhandlerService} from '../services/errorhandler.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {catchError, map} from 'rxjs/operators';
import {TournamentBetTypeVm} from '../Models/ViewModels/tournamentBetTypeVm';

@Injectable({
  providedIn: 'root'
})
export class TournamentBettypeService {
  rootUrl=environment.sportsApiUrl;
  param='TournamentBetTypes';
  paramGet='/GetAll';
  tournamentBetTypeId='?tbTId=';

  constructor(private http:HttpClient,private errorHandlerService:ErrorhandlerService) { }

  getTournamentBettypes():Observable<TournamentBetTypeVm[]>{
    return this.http.get<TournamentBetTypeVm[]>(`${this.rootUrl}${this.param}${this.paramGet}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getSingleAssociation(tbTId:number):Observable<TournamentBetType>{
    return this.http.get<TournamentBetType>(`${this.rootUrl}${this.param}${this.tournamentBetTypeId}${tbTId}`)
    .pipe(
    
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  addAssociation(tournamentBetType:TournamentBetType){
    return this.http.post(`${this.rootUrl}${this.param}`,tournamentBetType)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
  deleteLink(tbTId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.tournamentBetTypeId}${tbTId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  updateLink(tbId:number,tournamentBetType:TournamentBetType){
    return this.http.put(`${this.rootUrl}${this.param}${this.tournamentBetTypeId}${tbId}`,tournamentBetType)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

}
