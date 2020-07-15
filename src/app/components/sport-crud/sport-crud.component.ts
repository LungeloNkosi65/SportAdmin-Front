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

  getSingleSport(sportId:number){
  }

  addSport(sport:Sport){
    if(sport!=undefined && sport!==null){
      sport.SportId=this.sports.length+1;
      this.sportTreeService.addSport(sport).subscribe(()=>{
      this.getSports();
      });
    }
  }

  deleteSport(sportId:number){
    this.sportTreeService.deleteSport(sportId).subscribe(()=>{
      this.getSports();
    });
  }

  updateSport(sportId:number,sport:Sport){
    this.sportTreeService.updateSport(sportId,sport).subscribe(()=>{
      this.getSports();
    });
  }


  onFormSubmit(){
    const sportData=this.sportsForm.value;
    this.addSport(sportData);
  }

}
