import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Sport } from '../Models/sport';
import { Observable } from 'rxjs';
import { ErrorhandlerService } from './errorhandler.service';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SportTreeService {
  rootUrl = environment.sportsApiUrl;
  param = 'sports'
  sportId = '?sportId='
  paramSingle = '/GetSingle';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http: HttpClient, private errorHandlerService: ErrorhandlerService) { }

  getSports(): Observable<Sport[]> {
    return this.http.get<Sport[]>(`${this.rootUrl}${this.param}`)
      .pipe(catchError(this.errorHandlerService.handleError));
  }
  getSIngleSport(sportId: number): Observable<Sport> {
    return this.http.get<Sport>(`${this.rootUrl}${this.param}${this.paramSingle}${this.sportId}${sportId}`)
      .pipe(catchError(this.errorHandlerService.handleCrudError));
  }
  addSport(sport: Sport) {
    return this.http.post(`${this.rootUrl}${this.param}`, sport, this.httpOptions)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorHandlerService.handleCrudError)
      );
  }
  updateSport(sportId: number, sport: Sport) {
    return this.http.put(`${this.rootUrl}${this.param}${this.sportId}${sportId}`, sport, this.httpOptions)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorHandlerService.handleCrudError)
      );
  }
  deleteSport(sportId: number) {
    return this.http.delete(`${this.rootUrl}${this.param}${this.sportId}${sportId}`, this.httpOptions)
      .pipe(
        map((data: any) => {
          return data;
        }),
        catchError(this.errorHandlerService.handleCrudError)
      );
  }
}
