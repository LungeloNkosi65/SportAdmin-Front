import { Injectable } from '@angular/core';
import {Faculty} from '../models/Faculty';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/Department';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
 rootUrl=environment.rootUrl;
 parm='Faculties';
 private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http:HttpClient) { }

  getFaculties():Observable<Faculty[]>{
    return this.http.get<Faculty[]>(this.rootUrl+this.parm);
  }

  getSingleFaculty(id:number):Observable<Faculty>{
    return this.http.get<Faculty>(`${this.rootUrl}${this.parm}/${id}`)
  }

  addFuculty(faculty:Faculty){
    return this.http.post<Faculty>(this.rootUrl+this.parm,faculty,this.httpOptions);
  }

  deleteFaculty(id:number){
    return this.http.delete(`${this.rootUrl}${this.parm}/${id}`,this.httpOptions);
  }
  updateFaculty(faculty:Faculty){
    return this.http.put(`${this.rootUrl}${this.parm}`,faculty,this.httpOptions);
  }
  
}
