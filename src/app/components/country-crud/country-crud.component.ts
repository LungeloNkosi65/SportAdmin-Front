import { Component, OnInit } from '@angular/core';
import { Country } from '../../Models/country';
import {CountryService} from '../../services/country.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-country-crud',
  templateUrl: './country-crud.component.html',
  styleUrls: ['./country-crud.component.css']
})
export class CountryCrudComponent implements OnInit {
countries:Country[]=[];
countryForm:any;
country:Country;
countryUpdate=null;
formHeading:string;
  constructor(private countryService:CountryService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getCountries();
    this.countryForm=this.formBuilder.group({
      CountryName:['',Validators.required],
      Flag:['',Validators.nullValidator],
    })
  }
 

  getCountries(){
     this.countryService.getCountries().subscribe((data:any)=>{
       this.countries=data;
     });
  }

  addCountry(country:Country){
    if(country!=undefined && country!=null){
      if(this.countryUpdate==null){
        country.CountryId=this.countries.length+1;
        this.countryService.addCountry(country).subscribe(()=>{
        });
        this.getCountries();
      }
      else{
        country.CountryId=this.countryUpdate;
        this.countryService.updateCountry(this.countryUpdate,country).subscribe(()=>{
          this.getCountries();
          this.countryUpdate=null;
        })
      }
    }
  }


  deleteCountry(countryId:number){
    if(window.confirm('Are you sure you want to delete this record')){
      this.countryService.deleteCountry(countryId).subscribe(()=>{
        this.getCountries();
      });
    }
    else{
      this.getCountries();
    }
  }

  getCountryForEdit(countryId:number){
    this.countryService.getSingleCountry(countryId).subscribe((data:any)=>{
      this.country=data;
    });
  }

  onFormSubmit(){
    const countryData=this.countryForm.value;
    this.addCountry(countryData);
  }

  loadCountryToEdit(countryId:number){
    this.countryService.getSingleCountry(countryId).subscribe((data:any)=>{
      this.country=data;
      this.countryUpdate=countryId;
      console.log('Found this', this.country)
      this.countryForm.controls['CountryName'].setValue(data[0].CountryName);
      this.countryForm.controls['Flag'].setValue(data[0].Flag);  
    });
  }

  resertForm(){
    this.countryForm.reset();
  }

  setHeading(){
    this.countryUpdate=null;
  }

}
