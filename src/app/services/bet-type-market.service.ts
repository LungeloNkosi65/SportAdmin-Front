import { Injectable } from '@angular/core';
import {BetTypeMarket} from '../Models/betTypeMarket';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {BetTypeVm} from '../Models/ViewModels/betTypeVm';
import { ErrorhandlerService } from './errorhandler.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BetTypeMarketService {

  rootUrl=environment.sportsApiUrl;
  param='BetTypeMarkets';
  paramGet='/GetAll';
  peramId='?betTypeMarketId=';
  constructor(private http:HttpClient,private errorHandlerService: ErrorhandlerService) { }

  getBetTypeMarkets():Observable<BetTypeVm[]>{
    return this.http.get<BetTypeVm[]>(`${this.rootUrl}${this.param}${this.paramGet}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }
  
  getSingleBetTypeMarkets(betTypeMarketId:number):Observable<BetTypeVm>{
    return this.http.get<BetTypeVm>(`${this.rootUrl}${this.param}${this.peramId}${betTypeMarketId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  addAssociation(betTypeMarket:BetTypeMarket){
    return this.http.post(`${this.rootUrl}${this.param}`,betTypeMarket)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  deleteAssociation(betTypeMarketId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.peramId}${betTypeMarketId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  updateAssociations(betTypeMarketId:number,betTypeMarket:BetTypeMarket){
    return this.http.put(`${this.rootUrl}${this.param}${this.peramId}${betTypeMarketId}`,betTypeMarket)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );

  }
}
