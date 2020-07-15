import { Component, OnInit } from '@angular/core';
import { Event } from '../../Models/event';
import { Tournament } from '../../Models/tournament';
import { TournamentService } from '../../services/tournament.service';
import { EventService } from '../../services/event.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-crud',
  templateUrl: './event-crud.component.html',
  styleUrls: ['./event-crud.component.css']
})
export class EventCrudComponent implements OnInit {
  tournaments: Tournament[];
  tournament: Tournament;
  tournamentId: number;
  events: Event[];
  event: Event;
  eventId: number;
  eventForm:any;
  eventLocalData:Event;
  eventUpdate:number;

  constructor(private eventService:EventService,private tournamentService:TournamentService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getEvents();
    this.getTournaments();
    this.eventForm=this.formBuilder.group({
      EventName:['',Validators.required],
      EeventDate:['',Validators.required]
    });
  }

  getEvents(){
    this.eventService.getEvents().subscribe((data:any)=>{
      this.events=data;
    });
  }

  getSingleEvent(eventId:number){
    this.eventService.getSingleEvent(eventId).subscribe((data)=>{
      this.event=data;
    });
  }
  getTournaments(){
    this.tournamentService.getTournaments().subscribe((data:any)=>{
      this.tournaments=data;
    });
  }

  addEvent(event:Event){
    if(event!=undefined && event!=null){
      event.TournamentId=this.tournamentId;
      if(this.eventUpdate==null){
        event.EventId=this.events.length+1;
        this.eventService.addEvent(event).subscribe((data:any)=>{
          if(data!=null){
            this.getEvents();
          }
        });
      }
      else{
        this.eventService.updateEvent(this.eventUpdate,event).subscribe((data:any)=>{
          if(data!=null){
            this.getEvents();
          }
        });
      }
    }
  }

   deleteEvent(eventId:number){
     if(window.confirm("Are you sure you want to delete the record")){
      this.eventService.deleteEvent(eventId).subscribe((data:any)=>{
        if(data!=null){
          this.getEvents();
        }
      });
     }
   }

   loadEventToEdit(eventId:number){
     this.getSingleEvent(eventId);
     this.eventUpdate=eventId;
    //  this.eventForm.
   }

   onFormSubmit(){
      const formData=this.eventForm.value;
      this.addEvent(formData);
   }

   getTournamentId(tournamentId:number){
     this.tournamentId=tournamentId;
     console.log('submited id', this.tournamentId);
   }



}
