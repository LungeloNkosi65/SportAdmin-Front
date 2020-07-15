import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  rootUrl=environment.rootUrl;
  param='Students';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http:HttpClient) { }
  
  getStudents():Observable<Student[]>{
    return this.http.get<Student[]>(`${this.rootUrl}${this.param}`);
  }
  getSingleStudent(id:string):Observable<Student>{
    return this.http.get<Student>(`${this.rootUrl}${this.param}/${id}`);
  }

  addStudent(student:Student){
    return this.http.post(`${this.rootUrl}${this.param}`,student,this.httpOptions);
  }
   deleteStudent(id:string){
     return this.http.delete(`${this.rootUrl}${this.param}/${id}`,this.httpOptions);
   }

   updateStudent(student:Student){
     return this.http.put(`${this.rootUrl}${this.param}`,student,this.httpOptions);
   }
}
