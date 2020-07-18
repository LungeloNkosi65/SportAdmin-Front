import { Injectable } from '@angular/core';
import {Event} from '../Models/event';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {ErrorhandlerService} from '../services/errorhandler.service';
import { Observable } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { EventVm } from '../Models/ViewModels/eventVm';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  rootUrl=environment.sportsApiUrl;
  param='Events';
  paramGet='/GetAll'
  eventId='?eventId='
  constructor(private http:HttpClient,private errorHandler:ErrorhandlerService) { }

  getEvents():Observable<EventVm[]>{
    return this.http.get<EventVm[]>(`${this.rootUrl}${this.param}${this.paramGet}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getSingleEvent(eventId:number):Observable<Event>{
  return  this.http.get<Event>(`${this.rootUrl}${this.param}${this.eventId}${eventId}`);
  }

  addEvent(event:Event){
    return this.http.post(`${this.rootUrl}${this.param}`,event);
  }

  updateEvent(eventId:number,event:Event){
   return this.http.put(`${this.rootUrl}${this.param}${this.eventId}${eventId}`,event);
  }
  deleteEvent(eventId:number){
    return this.http.delete(`${this.rootUrl}${this.param}${this.eventId}${eventId}`);
  }
}
