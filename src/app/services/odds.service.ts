import { Injectable } from '@angular/core';
import { IOdds } from '../Models/odds';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { OddsVm } from '../Models/ViewModels/OddsVm';
import { ErrorhandlerService } from './errorhandler.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OddsService {

  rootUrl = environment.sportsApiUrl;
  param = 'OddsDefault';
  paramGet = '/GetAll';
  OddId = '?oddId=';

  constructor(private http: HttpClient, private errorHandlerService: ErrorhandlerService) { }

  getOdds(): Observable<OddsVm[]> {
    return this.http.get<OddsVm[]>(`${this.rootUrl}${this.param}${this.paramGet}`)
      .pipe(catchError(this.errorHandlerService.handleError));
  }

  getSingleOdd(oddId: number): Observable<IOdds> {
    return this.http.get<IOdds>(`${this.rootUrl}${this.param}${this.OddId}${oddId}`);
  }

  addOdds(odd: IOdds): Observable<any> {
    return this.http.post<any>(`${this.rootUrl}${this.param}`, odd)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.errorHandlerService.handleCrudError));
  }
  updateOdd(odd: IOdds): Observable<any> {
    return this.http.put<any>(`${this.rootUrl}${this.param}`, odd)
      .pipe(map((data: any) => {
        return data;
      }),
        catchError(this.errorHandlerService.handleCrudError));
  }

  deleteOdd(oddId: number) {
    return this.http.delete(`${this.rootUrl}${this.param}${this.OddId}${oddId}`)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorHandlerService.handleCrudError));
  }
}
