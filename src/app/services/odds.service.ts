import { Injectable } from '@angular/core';
import {IOdds} from '../Models/odds';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OddsVm } from '../Models/ViewModels/OddsVm';

@Injectable({
  providedIn: 'root'
})
export class OddsService {

  rootUrl=environment.sportsApiUrl;
  param='OddsDefault';
  paramGet='/GetAll';
  OddId='?oddId=';

  constructor(private http:HttpClient) { }

  getOdds():Observable<OddsVm[]>{
   return this.http.get<OddsVm[]>(`${this.rootUrl}${this.param}${this.paramGet}`);
  }

  getSingleOdd(oddId:number):Observable<IOdds>{
    return this.http.get<IOdds>(`${this.rootUrl}${this.param}${this.OddId}${oddId}`);
  }

  addOdds(odd:IOdds){
    return this.http.post(`${this.rootUrl}${this.param}`,odd);
  }
  updateOdd(odd:IOdds){
    return this.http.put(`${this.rootUrl}${this.param}`,odd);
  }

  deleteOdd(oddId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.OddId}${oddId}`);
  }
}
