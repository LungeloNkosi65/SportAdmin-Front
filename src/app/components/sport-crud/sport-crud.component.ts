import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {SportTreeService} from '../../services/sport-tree.service';
import { Sport } from 'src/app/Models/sport';

@Component({
  selector: 'app-sport-crud',
  templateUrl: './sport-crud.component.html',
  styleUrls: ['./sport-crud.component.css']
})
export class SportCrudComponent implements OnInit {

  sports:Sport[]=[];
  singleSport:Sport;
  sportsForm:any;
  sportUpdate:number;
  constructor(private sportTreeService:SportTreeService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getSports();
    this.sportsForm=this.formBuilder.group({
      Name:['',Validators.required],
      Logo:['',Validators.nullValidator]
    })
  }


  getSports(){
    this.sportTreeService.getSports().subscribe((data:any)=>{
      this.sports=data;
      console.log('sportsTree',this.sports)
    });
  }

 loadSportToEdit(sportId:number){
   console.log('Submited Id ',sportId);
   this.sportTreeService.getSIngleSport(sportId).subscribe((data:any)=>{
     this.singleSport=data;
     this.sportUpdate=sportId;
     this.sportsForm.controls['Name'].setValue(data[0].Name);
     this.sportsForm.controls['Logo'].setValue(data[0].Logo);
   })
 }

  // loadSportToEdit(sportId:number){
  //   console.log('submited Id',sportId);
  //   this.sportTreeService.getSIngleSport(sportId).subscribe((data:any)=>{
  //     this.singleSport=data;
  //     this.sportUpdate=sportId;
  //     this.sportsForm.controls['Name'].setValue(data[0].Name);
  //     this.sportsForm.controls['Logo'].setValue(data[0].Logo);
  // });}

  addSport(sport:Sport){
    if(sport!=undefined && sport!==null){
      if(this.sportUpdate==null){
        sport.SportId=this.sports.length+1;
        this.sportTreeService.addSport(sport).subscribe(()=>{
        this.getSports();
        });
      }
      else{
        if(window.confirm("Are you sure you want to update this record")){
          sport.SportId=this.sportUpdate;
          this.updateSport(this.sportUpdate,sport);
        }
   
      }
    
    }
  }

  deleteSport(sportId:number){
    if(window.confirm("Are you sure you want to delete record")){
      this.sportTreeService.deleteSport(sportId).subscribe(()=>{
        this.getSports();
        // console.log('inside Delete')
      });
    }

  }

  updateSport(sportId:number,sport:Sport){
    this.sportTreeService.updateSport(sportId,sport).subscribe(()=>{
      this.getSports();
    });
  }




  onFormSubmit(){
    const sportData=this.sportsForm.value;
    console.log('Data from form ',sportData);
    this.addSport(sportData);
  }

}
