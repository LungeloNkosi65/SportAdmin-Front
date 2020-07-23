import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { Country } from '../Models/country'
import { environment } from 'src/environments/environment';
import { ErrorhandlerService } from './errorhandler.service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  rootUrl = environment.sportsApiUrl;
  param = 'countries'
  param2='/getAll';
  paramsingle='/GetSingleCountry'
  Countryid = '?countryId=';

  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient,private errorHandlerService: ErrorhandlerService) { }
  
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.rootUrl}${this.param}${this.param2}`)
    .pipe(catchError(this.errorHandlerService.handleError));
  }

  addCountry(country:Country):Observable<any>{
    return this.http.post<any>(`${this.rootUrl}${this.param}`,country,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }
  deleteCountry(countryId:number):Observable<any>{
    return this.http.delete(`${this.rootUrl}${this.param}${this.Countryid}${countryId}`,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  updateCountry(countryId,country:Country):Observable<any>{
    return this.http.put(`${this.rootUrl}${this.param}${this.Countryid}${countryId}`,country,this.httpOptions)
    .pipe(
      map((data:any)=>{
        return data;
      }),
      catchError(this.errorHandlerService.handleCrudError)
    );
  }

  getSingleCountry(countryId:number):Observable<Country>{
    return this.http.get<Country>(`${this.rootUrl}${this.param}${this.paramsingle}${this.Countryid}${countryId}`,this.httpOptions)
    pipe(catchError(this.errorHandlerService.handleCrudError));
  }
  
}



