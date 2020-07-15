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
  constructor(private http:HttpClient) { }

  getBeTypes():Observable<BetType[]>
  {
    return this.http.get<BetType[]>(`${this.rootUrl}${this.param}`);
  }
}
