import { Component, OnInit } from '@angular/core';
import { TournamentBetType } from '../../Models/tournamentBetType';
import { importType } from '@angular/compiler/src/output/output_ast';
import { Tournament } from '../../Models/tournament';
import { BetType } from '../../Models/betType';
import { BettypeService } from '../../services/bettype.service';
import { TournamentBettypeService } from '../../services/tournament-bettype.service';
import { TournamentService } from '../../services/tournament.service';
import { FormBuilder } from '@angular/forms/';
import { throwIfEmpty } from 'rxjs/operators';
@Component({
  selector: 'app-tournament-bettype',
  templateUrl: './tournament-bettype.component.html',
  styleUrls: ['./tournament-bettype.component.css']
})
export class TournamentBettypeComponent implements OnInit {

  tournaments: Tournament[];
  tournament: Tournament;
  tournamentAssociations: TournamentBetType[];
  tournamentAssociation: TournamentBetType;
  betTypes: BetType[];
  betType: BetType;
  tournamentAssociationForm: any;
  tournamentId: number;
  betTypeId: number;
  localFormData:TournamentBetType;
  tournamentUpdate:number=null;

  constructor(private betTypeService: BettypeService, private tournamentBettypeService: TournamentBettypeService
    , private tournamentService: TournamentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getAssociations();
    this.getTournaments();
    this.getBetTypes();
    this.tournamentAssociationForm = this.formBuilder.group({

    });
  }

  getTournaments() {
    this.tournamentService.getTournaments().subscribe((data: any) => {
      this.tournaments = data;
    });
  }
  getBetTypes() {
    this.betTypeService.getBeTypes().subscribe((data: any) => {
      this.betTypes = data;
    });
  }
  getAssociations() {
    this.tournamentBettypeService.getTournamentBettypes().subscribe((data: any) => {
      this.tournamentAssociations = data;
    });
  }

  addLink(tournmentBetType: TournamentBetType) {
    if (tournmentBetType != undefined && tournmentBetType != null) {
      this.tournamentBettypeService.addAssociation(tournmentBetType).subscribe((data:any) => {
        if(data!=undefined){
          this.getAssociations();
          this.tournamentId=null;
          this.betTypeId=null;
          this.tournamentUpdate=null;
        }
      });
    }
  }
  updatezlink(tbTId:number,tournamentBetType:TournamentBetType){
     this.tournamentBettypeService.updateLink(tbTId,tournamentBetType).subscribe(data=>{
       if(data!=null || data!=undefined){
         this.getAssociations();
         this.tournamentUpdate=null;
       }
     })

  }
  removeLink(tBtId: number) {
    if(window.confirm("Are you sure you want to remove the linking")){
      this.tournamentBettypeService.deleteLink(tBtId).subscribe((data) => {
        if(data!=undefined){
          this.getAssociations();
          console.log('Api result ',data);
        }
      });
    }
  
  }
  getTournamentId(tournamentId: number) {
    this.tournamentId = tournamentId;
  }
  getBetTypeId(betTypeId: number) {
    this.betTypeId = betTypeId;
  }
  onSubmitForm(){
  this.localFormData={
    TbTid:this.tournamentAssociations.length+1,
    TournamentId:this.tournamentId,
    BetTypeId:this.betTypeId
   };
   this.addLink(this.localFormData);
  }
  setUpdate(tbtId:number){
    this.tournamentUpdate=tbtId;
  }

}
