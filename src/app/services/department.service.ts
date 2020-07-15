import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/Department';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  rootUrl=environment.rootUrl;
  param='Departments';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http:HttpClient) { }

   getDepartment():Observable<Department[]>{
     return this.http.get<Department[]>(this.rootUrl+this.param);
   }

   getSingleDepartment(id:number):Observable<Department>{
     return this.http.get<Department>(`${this.rootUrl}${this.param}/${id}`);
   }

   addDepartment(department:Department){
     return this.http.post(`${this.rootUrl}${this.param}`,department,this.httpOptions);
   }

   deleteDepartment(id:number){
     return this.http.delete(`${this.rootUrl}${this.param}/${id}`,this.httpOptions);
   }

   updateDepartment(department:Department){
     return this.http.put(`${this.rootUrl}${this.param}`,department,this.httpOptions);
   }
   
  
}
