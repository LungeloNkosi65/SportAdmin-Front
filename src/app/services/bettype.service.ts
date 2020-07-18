import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { BetType } from '../Models/betType';

@Injectable({
  providedIn: 'root'
})
export class BettypeService {

  rootUrl=environment.sportsApiUrl;
  param='BetTypes';
  paramGet='/GetAll';
  betTypeId='?betTypeId=';
  constructor(private http:HttpClient) { }

  getBeTypes():Observable<BetType[]>
  {
    return this.http.get<BetType[]>(`${this.rootUrl}${this.param}${this.paramGet}`);
  }

  getSingleBetType(betTypeId:number):Observable<BetType>{
    return this.http.get<BetType>(`${this.rootUrl}${this.param}${this.betTypeId}${betTypeId}`);
  }

  addBetType(betType:BetType){
    return this.http.post(`${this.rootUrl}${this.param}`,betType);
  }

  updateBetType(betTypeId:number,betType:BetType){
    return this.http.put(`${this.rootUrl}${this.param}${this.betTypeId}${betTypeId}`,betType);
  }
  deleteBetType(betTypeId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.betTypeId}${betTypeId}`);
  }
}
