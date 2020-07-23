import { Component, OnInit } from '@angular/core';
import {OddsService} from '../../services/odds.service';
import {Event} from '../../Models/event';
import {BetTypeMarket} from '../../Models/betTypeMarket';
import {BetTypeMarketService} from '../../services/bet-type-market.service';
import {EventService} from '../../services/event.service';
import {IOdds} from '../../Models/odds';
import { FormBuilder, Validators } from '@angular/forms';
import {OddsVm} from '../../Models/ViewModels/OddsVm';
import { BetTypeVm } from 'src/app/Models/ViewModels/betTypeVm';

@Component({
  selector: 'app-odds',
  templateUrl: './odds.component.html',
  styleUrls: ['./odds.component.css']
})
export class OddsComponent implements OnInit {

  odds:OddsVm[];
  oddsForm:any;
  events:Event[];
  selectedEvent:Event;
  btMarkets:BetTypeVm[];
  selectedBtm:BetTypeVm;
  btmId:number;
  eventId:number;
  oddsUpdate:number;
  singleOdd:OddsVm;


  constructor(private eventServices:EventService,private btmServicce:BetTypeMarketService,
              private formBuider:FormBuilder,private oddsService:OddsService) { }

  ngOnInit(): void {
    this.getOdds();
    this.getEvents();
    this.getBetTypeMarkets();
    this.oddsUpdate=null;
    this.oddsForm=this.formBuider.group({
      Odds1:['',Validators.required]
    });
  }
 

  getOdds(){
    this.oddsService.getOdds().subscribe((data:any)=>{
      this.odds=data;
    });
  }

  getEvents(){
    this.selectedEvent={
      EventId:null,
      EventName: 'Select Event',
      EeventDate:null,
      TournamentId:null
    };
    this.eventServices.getEvents().subscribe((data:any)=>{
      this.events=data;
    });
  }

  

  getBetTypeMarkets(){
    this.selectedBtm={
      BetTypeId:null,
      BetTypeMarketCode:'Select BTM Code',
      BetTypeName:null,
      BetTypeMarketId:null,
      MarketId:null,
      MarketName:null,
    };
    this.btmServicce.getBetTypeMarkets().subscribe((data:any)=>{
      this.btMarkets=data;
    });
  }


  addodds(odd:IOdds){
    if(odd!=null && odd!=undefined){
      console.log('OddsUpdate variable', this.oddsUpdate);
      if(this.oddsUpdate==null){
        odd.OddId=this.odds.length+1;
        odd.EventId=this.eventId;
        odd.BetTypeMarketId=this.btmId;
        this.oddsService.addOdds(odd).subscribe((data:any)=>{
          if(data!=null){
            this.getOdds();
            this.setHeading();
          }
        });
      }
      else{
        odd.OddId=this.oddsUpdate;
        odd.BetTypeMarketId=this.btmId;
        odd.EventId=this.eventId;
        // console.log('This is what i amm submiting', odd);

        this.oddsService.updateOdd(odd).subscribe((data:any)=>{
          if(data!=null){
            this.getOdds();
            this.oddsUpdate=null;
            this.clearForm();
          }
        });
      }
    }
  }

loadOddsToEdit(oddId:number){
  this.oddsUpdate=oddId;
  this.oddsService.getSingleOdd(oddId).subscribe((data:any)=>{
    this.singleOdd=data;
    console.log('Odd found ',data)
    this.oddsForm.controls['Odds1'].setValue(data[0].Odds1);
    this.getSingleEvent(data[0].EventId);
    this.getSIngleBTM(data[0].BetTypeMarketId);
  });
}

getSIngleBTM(bTmId:number){
  console.log('submited Id', bTmId);
  this.btmServicce.getSingleBetTypeMarkets(bTmId).subscribe((data:any)=>{
    this.selectedBtm=data[0];
    this.btmId=this.selectedBtm.BetTypeMarketId;
    console.log('Btn found ',data);
  });
}

getSingleEvent(eventId){
  this.eventServices.getSingleEvent(eventId).subscribe((data:any)=>{
    this.selectedEvent=data[0];
    this.eventId=this.selectedEvent.EventId;
    console.log('event found ',data);
  });
}



  



  onFormSubmit(){
    const formData=this.oddsForm.value;
    console.log('This is what i amm submiting', formData)
    this.addodds(formData);
  }


  getBtmID(btmID:any){
    this.selectedBtm=btmID;
    this.btmId=this.selectedBtm.BetTypeMarketId;
    console.log('sunmited id' ,this.btmId);
  }
  
  getEventId(eventId:any){
    this.selectedEvent=eventId;
    this.eventId=this.selectedEvent.EventId;
    console.log('sunmited id' ,this.eventId);
  }

  delete(oddId:number){
    if(window.confirm("Are you sure you want to delete record")){
      this.oddsService.deleteOdd(oddId).subscribe(()=>{
        this.getOdds();
      });
    }
  }

  clearForm(){
    this.oddsForm.reset();
  }

  setHeading(){
    this.oddsUpdate=null;
    this.clearForm();
  }

}
