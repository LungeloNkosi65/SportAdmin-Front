import { Component, OnInit } from '@angular/core';
import { SportCountry } from '../../Models/SportCountry';
import { SportsCountryService } from 'src/app/services/sports-country.service';
import { FormBuilder } from '@angular/forms';
import { Country } from 'src/app/Models/country';
import { Sport } from 'src/app/Models/sport';
import { SportTreeService } from 'src/app/services/sport-tree.service';
import { CountryService } from 'src/app/services/country.service';
import { SportCountryVm } from 'src/app/Models/ViewModels/sportCountryVm';


@Component({
  selector: 'app-sport-country',
  templateUrl: './sport-country.component.html',
  styleUrls: ['./sport-country.component.css']
})
export class SportCountryComponent implements OnInit {
  SportCountries: SportCountryVm[];
  sportCountry: SportCountry;
  sportCountryForm: any;
  countries: Country[];
  sports: Sport[];
  sport: Sport;
  country: Country;
  Selectedcountry: Country;
  Selectedsport: Sport;
  sportId: number = null;
  countryId: number = null;
  dataFromForm: SportCountry;
  updateOption:number;

  constructor(private sportCountryService: SportsCountryService, private formBuilder: FormBuilder,
    private sportService: SportTreeService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.getSportCountry();
    this.getCountries();
    this.getSports();
    this.sportCountryForm = this.formBuilder.group({
    });
  }

  ngAfterContentChecked(){
    // this.Selectedcountry={
    //   CountryId:null,
    //   CountryName:'Select Country',
    //   Flag:null
    // };
  }
  getSportCountry() {
    this.sportCountryService.getSportCountries().subscribe((data: any) => {
      this.SportCountries = data;
      console.log('Linked Ids', this.SportCountries);
    });
  }

  addSportToCountry(sportCountry: SportCountry) {
    if (sportCountry != undefined && sportCountry != null) {
      if(this.updateOption==null){
        this.sportCountryService.addSportToCountry(sportCountry).subscribe(() => {
          this.getSportCountry();
          this.sportId = null;
          this.countryId = null;
          this.changeHeading();
        });
      }
      else{
        sportCountry.CountryId=this.Selectedcountry.CountryId;
        sportCountry.SportId=this.Selectedsport.SportId;
        sportCountry.SportCountryId=this.updateOption;
        // console.log('Update db with this', sportCountry);
           this.sportCountryService.updateSportCountryLink(this.updateOption,sportCountry).subscribe(()=>{
             this.changeHeading();
           });
      }
   
    }
  }

  removeSportFromCountr(sportCountryId: number) {
    this.sportCountryService.deleteSportCountry(sportCountryId).subscribe(() => {
      this.getSportCountry();
    });
  }

  loadSportCountryToEdit(sportCountryId: number) {
    this.sportCountryService.getSingleSportCountry(sportCountryId).subscribe((data) => {
      this.sportCountry = data;
    });
  }

  getSports() {
    this.Selectedsport={
      SportId:null,
      Name:'Select Sport',
      Logo:null
    };
    this.sportService.getSports().subscribe((data: any) => {
      this.sports = data;
      // console.log('Sports', this.sports);
    });
  }
  getCountries() {
    this.Selectedcountry={
      CountryId:null,
      CountryName: 'Select Country',
      Flag:null
    };
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data;
      // console.log('Country', this.countries);
    });
  }

  unLinkSport(sortCountryId:number){
    if(window.confirm("Are you sure you want to unlink sport eith country")){
      this.sportCountryService.deleteSportCountry(sortCountryId).subscribe(()=>{
        this.getSportCountry();
      });
    }
  
  }

  getReferenceCounrtry(){
   this.countryService.getSingleCountry(this.countryId).subscribe((data:any)=>{
     this.country=data;
     this.Selectedcountry=data[0];
    //  console.log('reference country',this.country);
   });
  }
  getReferenceSPort(){
    console.log('sportId',this.sportId);
    this.sportService.getSIngleSport(this.sportId).subscribe((data:any)=>{
      this.sport=data;
      this.Selectedsport=data[0];
      // console.log('reference sport', this.Selectedsport);
    });
  }

  getSportId(sport: any) {
    this.Selectedsport=sport
    this.sportId = sport.SportId;
    // console.log('sportId', this.sportId);
    // console.log('sport for dropdown', this.Selectedsport);
  }
  getCountryId(country:any) {
    this.Selectedcountry=country;
    this.countryId = country.CountryId;
    // console.log('countryId', this.countryId);
    // console.log('country for dropdown',this.Selectedcountry);
  }

  onFormSubmit() {
    this.getReferenceCounrtry();
    this.getReferenceSPort();
    this.dataFromForm = {
      SportCountryId: this.SportCountries.length + 2,
      SportId: this.sportId,
      CountryId: this.countryId,
      // Country: this.country,
      // Sport: this.sport
    }
    // console.log('this is what i am adding ', this.dataFromForm);
    this.addSportToCountry(this.dataFromForm);
  }

      loadFormToEdit(sportCountryId:number){
        this.updateOption=sportCountryId;
       this.sportCountryService.getSingleSportCountry(sportCountryId).subscribe((data:any)=>{
         this.sportCountry=data;
        //  console.log('Db record',this.sportCountry);
         this.sportId=data[0].SportId;
         this.countryId=data[0].CountryId;
         this.getReferenceCounrtry();
         this.getReferenceSPort();
       });

      }




  changeHeading(){
    this.Selectedcountry={
      CountryId:null,
      CountryName: 'Select Country',
      Flag:null
    };
    this.Selectedsport={
      SportId:null,
      Name:'Select Sport',
      Logo:null
    }

  }

}
