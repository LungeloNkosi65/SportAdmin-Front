import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../Models/country'
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) { }
  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${this.rootUrl}${this.param}${this.param2}`);
  }

  addCountry(country:Country){
    return this.http.post(`${this.rootUrl}${this.param}`,country,this.httpOptions);
  }
  deleteCountry(countryId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.Countryid}${countryId}`,this.httpOptions);
  }

  updateCountry(countryId,country:Country){
    return this.http.put(`${this.rootUrl}${this.param}${this.Countryid}${countryId}`,country,this.httpOptions);
  }

  getSingleCountry(countryId:number):Observable<Country>{
    return this.http.get<Country>(`${this.rootUrl}${this.param}${this.paramsingle}${this.Countryid}${countryId}`,this.httpOptions);
  }
  
}



