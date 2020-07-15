import { Injectable } from '@angular/core';
import {SportCountry} from '../Models/SportCountry';
import {HttpClient} from '@angular/common/http';
import { ErrorhandlerService } from './errorhandler.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SportsCountryService {
 rootUrl=environment.sportsApiUrl;
 param='SportsCountries';
 pramGet='/GetAll';
 eventId='?sportCountryId=';
  constructor(private http:HttpClient, private errorHander:ErrorhandlerService) { }

  getSportCountries():Observable<SportCountry[]>{
    return this.http.get<SportCountry[]>(`${this.rootUrl}${this.param}${this.pramGet}`)
    .pipe(catchError(this.errorHander.handleError));
  }

  addSportToCountry(sportCOuntry:SportCountry){
    return this.http.post(`${this.rootUrl}${this.param}`,sportCOuntry);
  }

  getSingleSportCountry(sportCountrId:number):Observable<SportCountry>{
    return this.http.get<SportCountry>(`${this.rootUrl}${this.param}${sportCountrId}${sportCountrId}`);
  }
  deleteSportCountry(sportCountrId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.eventId}${sportCountrId}`);
  }
}
