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
import { TournamentBetTypeVm } from 'src/app/Models/ViewModels/tournamentBetTypeVm';
@Component({
  selector: 'app-tournament-bettype',
  templateUrl: './tournament-bettype.component.html',
  styleUrls: ['./tournament-bettype.component.css']
})
export class TournamentBettypeComponent implements OnInit {

  tournaments: Tournament[];
  tournament: Tournament;
  selectedtournament: Tournament;
  tournamentAssociations: TournamentBetTypeVm[];
  tournamentAssociation: TournamentBetType;
  betTypes: BetType[];
  betType: BetType;
  selectedbetType: BetType;
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
    this.tournamentAssociationForm=this.formBuilder.group({});

  }

  getTournaments() {
    this.selectedtournament={
      TournamentId:null,
      Name:'Selected Tournament',
    };
    this.tournamentService.getTournaments().subscribe((data: any) => {
      this.tournaments = data;
    });
  }
  getBetTypes() {
    this.selectedbetType={
      BetTypeId:null,
      BetTypeName:'Select Bet Type'
    };
    this.betTypeService.getBeTypes().subscribe((data: any) => {
      this.betTypes = data;
    });
  }
  getAssociations() {
    this.tournamentBettypeService.getTournamentBettypes().subscribe((data: any) => {
      this.tournamentAssociations = data;
      console.log('data', data)
    });
  }

  addLink(tournmentBetType: TournamentBetType) {
    if (tournmentBetType != undefined && tournmentBetType != null) {
      if(this.tournamentUpdate==null){
        this.tournamentBettypeService.addAssociation(tournmentBetType).subscribe((data:any) => {
          if(data!=undefined){
            this.getAssociations();
            this.tournamentId=null;
            this.betTypeId=null;
            this.tournamentUpdate=null;
            this.setHeading();
          }
        });
      }
      else{
        tournmentBetType.BetTypeId=this.selectedbetType.BetTypeId;
        tournmentBetType.TournamentId=this.selectedtournament.TournamentId;
        tournmentBetType.TbTid=this.tournamentUpdate;
        this.updatezlink(this.tournamentUpdate,tournmentBetType);
      }
  
    }
  }
  updatezlink(tbTId:number,tournamentBetType:TournamentBetType){
     this.tournamentBettypeService.updateLink(tbTId,tournamentBetType).subscribe(data=>{
       if(data!=null || data!=undefined){
         this.getAssociations();
         this.tournamentUpdate=null;
         this.setHeading();
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
  getTournamentId(tournament: any) {
    this.selectedtournament=tournament;
    this.tournamentId = tournament.TournamentId;
    console.log('submited id',this.tournamentId );
  }
  getBetTypeId(betType: any) {
    this.selectedbetType=betType;
    this.betTypeId = betType.BetTypeId;
    console.log('submited id',this.betTypeId );

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
    this.tournamentBettypeService.getSingleAssociation(tbtId).subscribe((data:any)=>{
      this.loadDataForUpdate(data[0].BetTypeId,data[0].TournamentId);
    });
  }

     loadDataForUpdate(betTyepeId:number,tournamentId:number){
       console.log('TournamentId', tournamentId);
       this.betTypeService.getSingleBetType(betTyepeId).subscribe((data:any)=>{
         this.selectedbetType=data[0];
         console.log('BetType from db',data);
       });

       this.tournamentService.getSingleTournament(tournamentId).subscribe((data:any)=>{
         this.selectedtournament=data[0];
         console.log('Tournament from db',data);
       });
     }
      
    setHeading(){
      this.selectedtournament={
        TournamentId:null,
        Name:'Selected Tournament',
      };
      this.selectedbetType={
        BetTypeId:null,
        BetTypeName:'Select Bet Type'
      };
      this.tournamentUpdate=null;
    }
}
