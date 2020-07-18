import { Injectable } from '@angular/core';
import {Market} from '../Models/market';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  rootUrl=environment.sportsApiUrl;
  param='Markets';
  paramGet='/GetAll';
  paramSingle='/GetSingle';
  marketId='?marketId=';

  constructor(private http:HttpClient) { }


  
  getMarkets():Observable<Market[]>{
    return this.http.get<Market[]>(`${this.rootUrl}${this.param}${this.paramGet}`);
  }

  getSingleMarket(marketId:number):Observable<Market>{
    return this.http.get<Market>(`${this.rootUrl}${this.param}${this.paramSingle}${this.marketId}${marketId}`);
  }

  addMarket(market:Market){
    return this.http.post(`${this.rootUrl}${this.param}`,market);
  }
  deleteMarket(marketId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.marketId}${marketId}`);
  }

  updateMarket(marketId:number,market:Market){
   return this.http.put(`${this.rootUrl}${this.param}${this.marketId}${marketId}`,market);
  }
}
