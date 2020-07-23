import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BetType } from '../Models/betType';
import { ErrorhandlerService } from './errorhandler.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BettypeService {

  rootUrl=environment.sportsApiUrl;
  param='BetTypes';
  paramGet='/GetAll';
  betTypeId='?betTypeId=';
  constructor(private http:HttpClient,private errorHandlerService: ErrorhandlerService) { }

  getBeTypes():Observable<BetType[]>
  {
    return this.http.get<BetType[]>(`${this.rootUrl}${this.param}${this.paramGet}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getSingleBetType(betTypeId:number):Observable<BetType>{
    return this.http.get<BetType>(`${this.rootUrl}${this.param}${this.betTypeId}${betTypeId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  addBetType(betType:BetType){
    return this.http.post(`${this.rootUrl}${this.param}`,betType)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  updateBetType(betTypeId:number,betType:BetType){
    return this.http.put(`${this.rootUrl}${this.param}${this.betTypeId}${betTypeId}`,betType)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
  deleteBetType(betTypeId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.betTypeId}${betTypeId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
}
