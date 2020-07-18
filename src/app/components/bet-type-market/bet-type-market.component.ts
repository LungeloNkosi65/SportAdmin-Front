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
  markets:Market[];
  betTypeMarketForm:any;
  marketId:number;
  betTypeId:number;
  btmUpdate:number;
  

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
    this.betTypeService.getBeTypes().subscribe((data:any)=>{
      this.betTypes=data;
    });
  }

  getMarkets(){
    this.marketService.getMarkets().subscribe((data:any)=>{
      this.markets=data;
    });
  }

  addAsscociation(betTypeMarket:BetTypeMarket){
    if(betTypeMarket!=undefined && betTypeMarket!=null){
      if(this.btmUpdate==null){
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
        betTypeMarket.BetTypeMarketId=this.btmUpdate;
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


  getBetTypeId(betTypeId:number){
    this.betTypeId=betTypeId;
    console.log('submited Id', this.betTypeId);

  }
  getMarketId(marketId:number){
    this.marketId=marketId;
    console.log('submited Id', this.marketId);
  }

  onformSubmit(){
    const formData=this.betTypeMarketForm.value;
    this.addAsscociation(formData);
  }

  clearForm(){
    this.betTypeMarketForm.clear();
  }

}
