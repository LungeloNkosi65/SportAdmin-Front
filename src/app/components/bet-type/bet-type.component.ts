import { Component, OnInit } from '@angular/core';
import { BetType } from '../../Models/betType';
import { BettypeService } from '../../services/bettype.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-bet-type',
  templateUrl: './bet-type.component.html',
  styleUrls: ['./bet-type.component.css']
})
export class BetTypeComponent implements OnInit {

  betTypes: BetType[];
  betTypeLocal: BetType;
  betTypeUpdate: number;
  betTypeForm: any;

  constructor(private betTypeService: BettypeService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getBetTypes();
    this.betTypeForm = this.formBuilder.group({
      BetTypeName: ['', Validators.required]
    });
  }

  getBetTypes() {
    this.betTypeService.getBeTypes().subscribe((data: any) => {
      this.betTypes = data;
      console.log('Bet Types', this.betTypes);
    });
  }

  addBetType(betType: BetType) {
    if (betType != null && betType != undefined) {
      if (this.betTypeUpdate == null) {
          betType.BetTypeId=this.betTypes.length+1;
        this.betTypeService.addBetType(betType).subscribe((data: any) => {
          if (data != null) {
            this.getBetTypes();
            this.clearForm();
          }
        });
      }
      else {
        ///TO DO UPDATE EVENT
        betType.BetTypeId=this.betTypeUpdate;
        this.betTypeService.updateBetType(this.betTypeUpdate,betType).subscribe((data:any)=>{
            if(data!=null){
              this.getBetTypes();
              this.betTypeUpdate=null;
              this.clearForm();
            }
        });
      }
    }

  }

  deleteBetType(betTypeId: number) {
    if(window.confirm("Are you sure you want to delete recod")){
      this.betTypeService.deleteBetType(betTypeId).subscribe((data: any) => {
        if (data != null) {
          this.getBetTypes();
        }
      });
    }
  }

  onformSubmit(){
    const formData=this.betTypeForm.value;
    this.addBetType(formData);
  }



  loadBetType(betTypeId:number){
    console.log('Id', betTypeId);
    this.betTypeService.getSingleBetType(betTypeId).subscribe((data:any)=>{
      this.betTypeLocal=data;
      console.log('this is what i found');
      this.betTypeForm.controls['BetTypeName'].setValue(data[0].BetTypeName);
      this.betTypeUpdate=betTypeId;
    });
  }
  clearForm(){
    this.betTypeForm.clear();
  }

  setHeading(){
    this.betTypeUpdate=null;
  }

}
