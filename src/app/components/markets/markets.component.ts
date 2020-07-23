import { Component, OnInit } from '@angular/core';
import { Market } from '../../Models/market';
import { MarketService } from '../../services/market.service';
import { FormBuilder, Validators } from '@angular/forms';
import { from } from 'rxjs';
@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {

  markets: Market[];
  marketLocal: Market;
  marketForm: any;
  updateMarket: number;

  constructor(private marketService: MarketService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getMarkets();
    this.marketForm = this.formBuilder.group({
      MarketName: ['', Validators.required]
    });
  }

  getMarkets() {
    this.marketService.getMarkets().subscribe((data: any) => {
      this.markets = data;
      // console.log('retrieved', this.markets);
    });
  }

  addMarket(market: Market) {
    if (market != undefined && market != null) {
      if (this.updateMarket == null) {
        market.MarketId = this.markets.length + 1;
        this.marketService.addMarket(market).subscribe((data: any) => {
          if (data != null) {
            this.getMarkets();
            this.clearForm();
          }
        });
      }
      else {
        //TODO UPDATE MARKET
        market.MarketId = this.updateMarket;
        this.marketService.updateMarket(this.updateMarket, market).subscribe((data: any) => {
          if (data != undefined || data != null) {
            this.getMarkets();
            this.clearForm();
            this.updateMarket=null;
          }
        });
      }
    }
  }

  deletMarket(marketId: number) {
    if (window.confirm("Are you sure you want to delete record")) {
      this.marketService.deleteMarket(marketId).subscribe((data: any) => {
        if (data != null || data != undefined) {
          this.getMarkets();
        }
      });
    }
  }

  loadFrom(marketId: number) {
    this.updateMarket = marketId;
    this.marketService.getSingleMarket(marketId).subscribe((data: any) => {
      // console.log('I found this', data);
      this.marketForm.controls['MarketName'].setValue(data[0].MarketName)
    });
  }

  onFormSubmit() {
    const formData = this.marketForm.value;
    this.addMarket(formData);
  }


  clearForm() {
    this.marketForm.reset();
  }

  setaHeading(){
    this.updateMarket=null;
    this.clearForm();
  }

}
