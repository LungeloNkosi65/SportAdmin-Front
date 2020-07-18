import { Injectable } from '@angular/core';
import {BetTypeMarket} from '../Models/betTypeMarket';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {BetTypeVm} from '../Models/ViewModels/betTypeVm';

@Injectable({
  providedIn: 'root'
})
export class BetTypeMarketService {

  rootUrl=environment.sportsApiUrl;
  param='BetTypeMarkets';
  paramGet='/GetAll';
  peramId='?betTypeMarketId=';
  constructor(private http:HttpClient) { }

  getBetTypeMarkets():Observable<BetTypeVm[]>{
    return this.http.get<BetTypeVm[]>(`${this.rootUrl}${this.param}${this.paramGet}`);
  }
  
  getSingleBetTypeMarkets(betTypeMarketId:number):Observable<BetTypeVm>{
    return this.http.get<BetTypeVm>(`${this.rootUrl}${this.param}${this.peramId}${betTypeMarketId}`);
  }

  addAssociation(betTypeMarket:BetTypeMarket){
    return this.http.post(`${this.rootUrl}${this.param}`,betTypeMarket);
  }

  deleteAssociation(betTypeMarketId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.peramId}${betTypeMarketId}`);
  }

  updateAssociations(betTypeMarketId:number,betTypeMarket:BetTypeMarket){
    return this.http.put(`${this.rootUrl}${this.param}${this.peramId}${betTypeMarketId}`,betTypeMarket);

  }
}
