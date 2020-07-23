import { Component, OnInit } from '@angular/core';
import {BetTypeMarketService} from '../../services/bet-type-market.service';
import {BetTypeMarket} from '../../Models/betTypeMarket';
import {BetType} from '../../Models/betType';
import {Market} from '../../Models/market';
import {FormBuilder} from '@angular/forms';
import {BettypeService} from '../../services/bettype.service';
import {MarketService} from '../../services/market.service';
import { BetTypeVm } from 'src/app/Models/ViewModels/betTypeVm';

@Component({
  selector: 'app-bet-type-market',
  templateUrl: './bet-type-market.component.html',
  styleUrls: ['./bet-type-market.component.css']
})
export class BetTypeMarketComponent implements OnInit {

  betTypeMarkets:BetTypeVm[];
  betTypeMarket:BetTypeMarket;
  betTypes:BetType[];
  selectedBetType:BetType;
  markets:Market[];
  selectedMarket:Market;
  betTypeMarketForm:any;
  marketId:number;
  betTypeId:number;
  btmUpdate:number;
  betTypeMarketUpdate:number;
  

  constructor(private betTyMarketService:BetTypeMarketService, private marketService:MarketService,
              private betTypeService:BettypeService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getBettypeAssociations();
    this.getMarkets();
    this.getBetTypes();
    this.betTypeMarketForm=this.formBuilder.group({
    });
  }

  getBettypeAssociations(){
    this.betTyMarketService.getBetTypeMarkets().subscribe((data:any)=>{
      this.betTypeMarkets=data;
    });
  }

  getBetTypes(){
    this.selectedBetType={
      BetTypeId:null,
      BetTypeName:'Select Bet Type'
    }
    this.betTypeService.getBeTypes().subscribe((data:any)=>{
      this.betTypes=data;
    });
  }

  getMarkets(){
    this.selectedMarket={
      MarketId:null,
      MarketName:'Select Market'
    }
    this.marketService.getMarkets().subscribe((data:any)=>{
      this.markets=data;
    });
  }

  addAsscociation(betTypeMarket:BetTypeMarket){
    if(betTypeMarket!=undefined && betTypeMarket!=null){
      if(this.betTypeMarketUpdate==null){
        betTypeMarket.BetTypeMarketId=this.betTypeMarkets.length+1;
        betTypeMarket.BetTypeId=this.betTypeId;
        betTypeMarket.MarketId=this.marketId;
        this.betTyMarketService.addAssociation(betTypeMarket).subscribe((data)=>{
          if(data!=null && data!=undefined){
            this.getBettypeAssociations();
          }
        });
      }
      else{
        //TODOD UPDATE ASSOCIATIONS
        betTypeMarket.BetTypeMarketId=this.betTypeMarketUpdate;
        betTypeMarket.MarketId=this.selectedMarket.MarketId;
        betTypeMarket.BetTypeId=this.selectedBetType.BetTypeId;
        this.betTyMarketService.updateAssociations(this.betTypeMarketUpdate,betTypeMarket).subscribe((data:any)=>{
         alert(data.text);
         console.log(data);
          this.setHeading();
          this.getBettypeAssociations();
        });
      }
    }
  }


  deleteAssociation(betTypeMarketId:number){
    console.log('submited id',betTypeMarketId);
    if(window.confirm("Are you sure you want delete link")){
      this.betTyMarketService.deleteAssociation(betTypeMarketId).subscribe((data:any)=>{
        if(data!=null && data!=undefined){
          this.getBettypeAssociations();
        }
      });
    }
   
  }


  loadDataForEdit(betTypeMarketId:number){
    this.betTypeMarketUpdate=betTypeMarketId;
    this.betTyMarketService.getSingleBetTypeMarkets(betTypeMarketId).subscribe((data:any)=>{
      this.getBetTypeForDropdown(data[0].BetTypeId);
      this.getMarketForDropdown(data[0].MarketId);
    })
  }


  getMarketForDropdown(marketId:number){
    this.marketService.getSingleMarket(marketId).subscribe((data:any)=>{
       this.selectedMarket=data[0];
    });
  }
  getBetTypeForDropdown(betTypeId:number){
    this.betTypeService.getSingleBetType(betTypeId).subscribe((data:any)=>{
      this.selectedBetType=data[0];
    });
  }

  getBetTypeId(betType:any){
    this.selectedBetType=betType;
    this.betTypeId=betType.BetTypeId;
    console.log('submited Id', this.betTypeId);

  }
  getMarketId(market:any){
    this.selectedMarket=market;
    this.marketId=this.selectedMarket.MarketId;
    console.log('submited Id', this.marketId);
  }

  onformSubmit(){
    const formData=this.betTypeMarketForm.value;
    this.addAsscociation(formData);
  }

  clearForm(){
    this.betTypeMarketForm.reset();
  }

  setHeading(){
    this.betTypeMarketUpdate=null;
    this.selectedMarket={
      MarketId:null,
      MarketName:'Select Market'
    };
    this.selectedBetType={
      BetTypeId:null,
      BetTypeName:'Select Bet Type'
    };
  }

}
