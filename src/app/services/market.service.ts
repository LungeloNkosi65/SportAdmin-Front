import { Injectable } from '@angular/core';
import {Market} from '../Models/market';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ErrorhandlerService } from './errorhandler.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  rootUrl=environment.sportsApiUrl;
  param='Markets';
  paramGet='/GetAll';
  paramSingle='/GetSingle';
  marketId='?marketId=';

  constructor(private http:HttpClient,private errorHandlerService: ErrorhandlerService) { }


  
  getMarkets():Observable<Market[]>{
    return this.http.get<Market[]>(`${this.rootUrl}${this.param}${this.paramGet}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  getSingleMarket(marketId:number):Observable<Market>{
    return this.http.get<Market>(`${this.rootUrl}${this.param}${this.paramSingle}${this.marketId}${marketId}`)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  addMarket(market:Market){
    return this.http.post(`${this.rootUrl}${this.param}`,market)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
  deleteMarket(marketId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.marketId}${marketId}`) .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  updateMarket(marketId:number,market:Market){
   return this.http.put(`${this.rootUrl}${this.param}${this.marketId}${marketId}`,market)
   .pipe(
    map((data:any)=>{
      return data;
    }),
    catchError(this.errorHandlerService.handleCrudError)
  );
  }
}
