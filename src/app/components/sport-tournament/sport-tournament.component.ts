import { Component, OnInit } from '@angular/core';
import { Sport } from '../../Models/sport';
import { Country } from '../../Models/country';
import { Tournament } from '../../Models/tournament';
import { SportTournament } from '../../Models/sportTournament';
import { SportTournamentService } from '../../services/sport-tournament.service';
import { FormBuilder } from '@angular/forms';
import { SportTreeService } from 'src/app/services/sport-tree.service';
import { TournamentService } from 'src/app/services/tournament.service';
import { CountryService } from 'src/app/services/country.service';
import { SportTournamentVm } from '../../Models/ViewModels/SportTournament';

@Component({
  selector: 'app-sport-tournament',
  templateUrl: './sport-tournament.component.html',
  styleUrls: ['./sport-tournament.component.css']
})
export class SportTournamentComponent implements OnInit {

  sportTournaments: SportTournamentVm[];
  sports: Sport[];
  tournaments: Tournament[];
  Selectedtournament: Tournament;
  countries: Country[];
  sportTournament: SportTournament;
  sport: Sport;
  Selectedsport: Sport;
  country: Country;
  Selectedcountry: Country;
  sportId: number
  countryId: number;
  tournamentId: number;
  sportTournamenteForm: any;
  sportTournamentData: SportTournament;
  sportTournamentUpdate: number;

  constructor(private sportTournamentService: SportTournamentService, private formBuilder: FormBuilder,
    private sportService: SportTreeService, private tournamentService: TournamentService, private countryService: CountryService) { }

  ngOnInit(): void {
    this.getSporTournaments();
    this.getTournaments();
    this.getCountries();
    this.getSports();
    this.sportTournamenteForm = this.formBuilder.group({

    });
  }

  getSports() {
    this.Selectedsport={
      SportId:null,
      Name:'Select Sport',
      Logo:null
    }
    this.sportService.getSports().subscribe((data: any) => {
      this.sports = data;
    });
  }
  getTournaments() {
    this.Selectedtournament = {
      TournamentId: null,
      Name: 'Select Tournament',
    }
    this.tournamentService.getTournaments().subscribe((data: any) => {
      this.tournaments = data;
    });
  }
  getCountries() {
    this.Selectedcountry={
      CountryId:null,
      CountryName:'Select Country',
      Flag:null
    }
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }

  getSporTournaments() {
    this.sportTournamentService.getSportTournaments().subscribe((data: any) => {
      this.sportTournaments = data;
      // console.log('sportTournaments', this.sportTournaments);
    });
  }

  addSportsTournaments(sportTournament: SportTournament) {

    if (sportTournament != undefined && sportTournament != null) {
      if (this.sportTournamentUpdate == null) {
        this.sportTournamentService.addSportTournament(sportTournament).subscribe((data:any) => {
          this.getSporTournaments();
          alert(data.text);
        });
      }
      else {
        // console.log('sportUpdateId', this.sportTournamentUpdate)
        sportTournament.SportTourtnamentId=this.sportTournamentUpdate;
        sportTournament.CountryId=this.Selectedcountry.CountryId;
        sportTournament.SportId=this.Selectedsport.SportId;
        sportTournament.TournamentId=this.Selectedtournament.TournamentId;
        this.updateLink(this.sportTournamentUpdate, sportTournament);

      }

    }
  }

  removeLink(sportTournamentId: number) {
    if (window.confirm("Are you sure you want to remove the link")) {
      this.sportTournamentService.deleteSportTournament(sportTournamentId).subscribe((data:any) => {
        this.getSporTournaments();
        alert(data.text);
      });
    }

  }
  updateLink(sportTournamentId: number, sportTournament: SportTournament) {
    this.sportTournamentService.updateSportTournament(sportTournamentId, sportTournament).subscribe((data:any) => {
     console.log(data);
      this.getSporTournaments();
      this.sportTournamentUpdate = null;
      alert(data.text);
    });
  }

  loadSportTournament(sportTournamentId: number) {
    this.sportTournamentUpdate=sportTournamentId;
    this.sportTournamentService.getSingleAssociation(sportTournamentId).subscribe((data: any) => {
      this.sportTournament = data;
      // console.log('Edit this record',data);
      this.getDataForDropdown(data[0].SportId,data[0].TournamentId,data[0].CountryId);
    });
  }

  getSportId(sport: any) {
    this.Selectedsport=sport;
    this.sportId = sport.SportId;
    // console.log('submited sportId', this.Selectedsport);
  }
  getCountryId(country: any) {
    this.Selectedcountry=country;
    this.countryId = country.CountryId;
    // console.log('submited country', this.Selectedcountry)
  }
  getTournamentId(tournament: any) {
    // console.log('submited tournament', tournament);
    this.Selectedtournament = tournament;
    this.tournamentId = tournament.TournamentId;
  }

  onFormSubmit() {
    this.sportTournamentData = {
      SportTourtnamentId: this.sportTournaments.length + 1,
      SportId: this.sportId,
      CountryId: this.countryId,
      TournamentId: this.tournamentId
    };
    this.addSportsTournaments(this.sportTournamentData);
  }

  updateLinkClick(sportTournamentId: number) {
    this.sportTournamentUpdate = sportTournamentId;
  }


  getDataForDropdown(sportId:number,tournamentId:number,countryId:number){
    // console.log('TournamentId passed',tournamentId)
    this.sportService.getSIngleSport(sportId).subscribe((data:any)=>{
      this.Selectedsport=data[0];
    });
    this.countryService.getSingleCountry(countryId).subscribe((data:any)=>{
      this.Selectedcountry=data[0];
    });

    this.tournamentService.getSingleTournament(tournamentId).subscribe((data:any)=>{
      this.Selectedtournament=data[0];
      // console.log('Tournament To Edit',data[0]);
    });
  }


  setHeading(){
    this.Selectedtournament = {
      TournamentId: null,
      Name: 'Select Tournament',
    };
    this.Selectedsport={
      SportId:null,
      Name:'Select Sport',
      Logo:null
    };
    this.Selectedcountry={
      CountryId:null,
      CountryName:'Select Country',
      Flag:null
    };
    this.sportTournamentUpdate=null;
  }

}
