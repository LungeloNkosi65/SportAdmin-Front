import { Component, OnInit } from '@angular/core';
import { Event } from '../../Models/event';
import { Tournament } from '../../Models/tournament';
import { TournamentService } from '../../services/tournament.service';
import { EventService } from '../../services/event.service';
import { FormBuilder, Validators } from '@angular/forms';
import {EventVm} from '../../Models/ViewModels/eventVm';

@Component({
  selector: 'app-event-crud',
  templateUrl: './event-crud.component.html',
  styleUrls: ['./event-crud.component.css']
})
export class EventCrudComponent implements OnInit {
  tournaments: Tournament[];
  Selectedtournament: Tournament;
  tournamentId: number;
  events: EventVm[];
  event: Event;
  eventId: number;
  eventForm:any;
  eventLocalData:Event;
  eventUpdate:number;

  constructor(private eventService:EventService,private tournamentService:TournamentService,
              private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getTournaments();
    this.getEvents();
    this.eventForm=this.formBuilder.group({
      EventName:['',Validators.required],
      EeventDate:['',Validators.required]
    });
    // this.tournaments.lenghtl
  }

  ngAfterContentChcked(){
    this.Selectedtournament={
      TournamentId:null,
      Name:'Select Tournament'
    }
  }

  getEvents(){
    this.eventService.getEvents().subscribe((data:any)=>{
      this.events=data;
      console.log('events', this.events);
    });
  }

  // getSingleEvent(eventId:number){
  //   this.eventService.getSingleEvent(eventId).subscribe((data)=>{
  //     this.event=data;
  //   });
  // }
  getTournaments(){
    this.Selectedtournament={
      TournamentId:null,
      Name:'Select Tournament'
    };
    this.tournamentService.getTournaments().subscribe((data:any)=>{
      this.tournaments=data;
      // this.Selectedtournament=data[0];
    });
  }

  addEvent(event:Event){
    console.log('UpdateId',this.eventUpdate);
    if(event!=undefined && event!=null){
      if(this.eventUpdate==null){
        event.EventId=this.events.length+2;
        event.TournamentId=this.tournamentId;
        this.eventService.addEvent(event).subscribe((data:any)=>{
          if(data!=null){
            this.getEvents();
            this.changeHeading();
          }
        });
      }
      else{
        event.EventId=this.eventUpdate;
        event.TournamentId=Number(this.tournamentId);
        this.eventService.updateEvent(this.eventUpdate,event).subscribe((data:any)=>{
            this.getEvents();
            this.changeHeading();
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
      this.eventUpdate=eventId;
      this.eventService.getSingleEvent(eventId).subscribe((data)=>{
      this.event=data;
      this.tournamentId=this.event[0].TournamentId;
      this.eventForm.controls['EventName'].setValue(this.event[0].EventName);
      this.eventForm.controls['EeventDate'].setValue(this.event[0].EeventDate);
    });
     console.log('eventId passed ',eventId)
    //  this.eventForm.
   }


   onFormSubmit(){
      const formData=this.eventForm.value;
      this.addEvent(formData);
   }

   getTournamentId(tournamentId:any){
     this.Selectedtournament=tournamentId;
     this.tournamentId=this.Selectedtournament.TournamentId;
     console.log('submited id', this.tournamentId);
   }
   clearForm(){
     this.eventForm.reset();
   }

   changeHeading(){
     this.eventUpdate=null;
     this.Selectedtournament={
      Name:"Select Tournament",
      TournamentId:null
    };
    this.clearForm();
    //  console.log('HEading changed to ', this.eventUpdate)
   }


}
