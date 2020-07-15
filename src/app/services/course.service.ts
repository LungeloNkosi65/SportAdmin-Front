import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  rootUrl=environment.rootUrl;
  param='Courses';
  private httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  constructor(private http:HttpClient) { }

  getCourse():Observable<Course[]>{
    return this.http.get<Course[]>(`${this.rootUrl}${this.param}`);
  }
  getSingleCourse(id:number):Observable<Course>{
    return this.http.get<Course>(`${this.rootUrl}${this.param}/${id}`);
  }

  addCourse(course:Course){
    return this.http.post(`${this.rootUrl}${this.param}`,course,this.httpOptions);
  }

  deleteCourse(id:number){
    return this.http.delete(`${this.rootUrl}${this.param}/${id}`,this.httpOptions);
  }

  updateCourse(course:Course){
    return this.http.put(`${this.rootUrl}${this.param}`,course,this.httpOptions);
  }
}
