import { Component, OnInit } from '@angular/core';
import { SportCountry } from '../../Models/SportCountry';
import { SportsCountryService } from 'src/app/services/sports-country.service';
import { FormBuilder } from '@angular/forms';
import { Country } from 'src/app/Models/country';
import { Sport } from 'src/app/Models/sport';
import { SportTreeService } from 'src/app/services/sport-tree.service';
import { CountryService } from 'src/app/services/country.service';


@Component({
  selector: 'app-sport-country',
  templateUrl: './sport-country.component.html',
  styleUrls: ['./sport-country.component.css']
})
export class SportCountryComponent implements OnInit {
  SportCountries: SportCountry[];
  sportCountry: SportCountry;
  sportCountryForm: any;
  countries: Country[];
  sports: Sport[];
  sport: Sport;
  country: Country;
  sportId: number = null;
  countryId: number = null;
  dataFromForm: SportCountry;
  updateOption: boolean = false;
  constructor(private sportCountryService: SportsCountryService, private formBuilder: FormBuilder,
    private sportService: SportTreeService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.getSportCountry();
    this.getCountries();
    this.getSports();
    this.sportCountryForm = this.formBuilder.group({

    });
  }
  getSportCountry() {
    this.sportCountryService.getSportCountries().subscribe((data: any) => {
      this.SportCountries = data;
      console.log('Linked Ids', this.SportCountries);
    });
  }

  addSportToCountry(sportCountry: SportCountry) {
    if (sportCountry != undefined && sportCountry != null) {
      this.sportCountryService.addSportToCountry(sportCountry).subscribe(() => {
        this.getSportCountry();
        this.sportId = null;
        this.countryId = null;
      });
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
    this.sportService.getSports().subscribe((data: any) => {
      this.sports = data;
      console.log('Sports', this.sports);
    });
  }
  getCountries() {
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data;
      console.log('Country', this.countries);

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
     console.log('reference country',this.country);
   })
  }
  getReferenceSPort(){
    this.sportService.getSIngleSport(this.sportId).subscribe((data:any)=>{
      this.sport=data;
      console.log('reference sport', this.sport);
    })
  }

  getSportId(sportID: number) {
    this.sportId = sportID;
    console.log('sportId', this.sportId);
  }
  getCountryId(countryId: number) {
    this.countryId = countryId;
    console.log('countryId', this.countryId);
  }

  onFormSubmit() {
    this.getReferenceCounrtry();
    this.getReferenceSPort();
    this.dataFromForm = {
      SportCountryId: this.SportCountries.length + 2,
      SportId: this.sportId,
      CountryId: this.countryId,
      Country: this.country,
      Sport: this.sport
    }
    console.log('this is what i am adding ', this.dataFromForm);
    this.addSportToCountry(this.dataFromForm);
  }

}
