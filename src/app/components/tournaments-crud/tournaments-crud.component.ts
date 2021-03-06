import { Component, OnInit } from '@angular/core';
import {Tournament} from '../../models/tournament';
import { from } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { TournamentService } from 'src/app/services/tournament.service';

@Component({
  selector: 'app-tournaments-crud',
  templateUrl: './tournaments-crud.component.html',
  styleUrls: ['./tournaments-crud.component.css']
})
export class TournamentsCrudComponent implements OnInit {

  tournamentForm:any;
  tournaments:Tournament[];
  tournament:Tournament;
  tournamentUpdate:number;
  constructor( private tournamentService:TournamentService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getTournaments();
    this.tournamentForm=this.formBuilder.group({
      Name:['',[Validators.required]]
    });
  }

  deleteTournament(tournamentId:number){
    if((window.confirm("Are you sure you want to delete this record"))){
      this.tournamentService.deleteTournament(tournamentId).subscribe(()=>{
        this.getTournaments();
      });
      this.getTournaments();
    }
   
  }

  addTournament(tournament:Tournament){
    if(tournament!=undefined || tournament!=null){
      if(this.tournamentUpdate==null){
        tournament.TournamentId=this.tournaments.length+1;
        // console.log('data submited',tournament)
        this.tournamentService.addTournamen(tournament).subscribe(()=>{
          this.getTournaments();
          this.clearForm();
        });
      }
      else{
          tournament.TournamentId=this.tournamentUpdate;
          // console.log('New Updated Record', tournament);
          this.tournamentService.updateTournament(this.tournamentUpdate,tournament).subscribe((data:any)=>{
            this.getTournaments();
              this.setHeading();
          });
      }
    
    }
  }


  loadTournamentToEdit(tournamentId:number){
    // console.log('submited Id', tournamentId);
    this.tournamentUpdate=tournamentId;
    this.tournamentService.getSingleTournament(tournamentId).subscribe((data:any)=>{
      this.tournament=data;
      this.tournamentForm.controls['Name'].setValue(data[0].Name);
    });
  }
  getTournaments(){
    this.tournamentService.getTournaments().subscribe((data:any)=>{
      this.tournaments=data;
      console.log(data);
    });
  }
  //end
  onFormSubmit(){
    const tournamentData=this.tournamentForm.value;
    this.addTournament(tournamentData);
    return tournamentData;
  }

  clearForm(){
    this.tournamentForm.reset();
  }

  setHeading(){
    this.tournamentUpdate=null;
    this.clearForm();
  }
}
