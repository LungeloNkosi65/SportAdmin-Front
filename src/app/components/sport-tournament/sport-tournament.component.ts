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

@Component({
  selector: 'app-sport-tournament',
  templateUrl: './sport-tournament.component.html',
  styleUrls: ['./sport-tournament.component.css']
})
export class SportTournamentComponent implements OnInit {

  sportTournaments: SportTournament[];
  sports: Sport[];
  tournaments: Tournament[];
  countries: Country[];
  sportTournament: SportTournament;
  sport: Sport;
  country: Country;
  sportId: number
  countryId: number;
  tournamentId: number;
  sportTournamenteForm: any;
  sportTournamentData: SportTournament;
  sportTournamentUpdate:number;

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
    this.sportService.getSports().subscribe((data: any) => {
      this.sports = data;
    });
  }
  getTournaments() {
    this.tournamentService.getTournaments().subscribe((data: any) => {
      this.tournaments = data;
    });
  }
  getCountries() {
    this.countryService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }

  getSporTournaments() {
    this.sportTournamentService.getSportTournaments().subscribe((data: any) => {
      this.sportTournaments = data;
      console.log('sportTournaments', this.sportTournaments);
    });
  }

  addSportsTournaments(sportTournament: SportTournament) {
    
    if (sportTournament != undefined && sportTournament != null) {
      if(this.sportTournamentUpdate==null){
        this.sportTournamentService.addSportTournament(sportTournament).subscribe(() => {
          this.getSporTournaments();
        });
      }
      else{
        this.updateLink(this.sportTournamentUpdate,sportTournament);
      }
 
    }
  }

  removeLink(sportTournamentId: number) {
    if(window.confirm("Are you sure you want to remove the link")){
      this.sportTournamentService.deleteSportTournament(sportTournamentId).subscribe(() => {
        this.getSporTournaments();
      });
    }
   
  }
  updateLink(sportTournamentId:number, sportTournament: SportTournament) {
    this.sportTournamentService.updateSportTournament(sportTournamentId, sportTournament).subscribe(() => {
      this.getSporTournaments();
      this.sportTournamentUpdate=null;
    });
  }

  loadSportTournament(sportTournamentId: number) {
    this.sportTournamentService.getSingleAssociation(sportTournamentId).subscribe((data: any) => {
      this.sportTournament = data;
    });
  }
  getSportId(sportId: number) {
    this.sportId = sportId;
    console.log('submited sportId', this.sportId);
  }
  getCountryId(countryId: number) {
   this.countryId=countryId;
   console.log('submited countryId', this.countryId)
  }
  getTournamentId(tournamentId: number) {
this.tournamentId=tournamentId;
console.log('submited tournamentId',tournamentId);
  }

  onFormSubmit() {
    this.sportTournamentData = {
      SportTourtnamentId:this.sportTournaments.length+1,
      SportId:this.sportId,
      CountryId:this.countryId,
      TournamentId:this.tournamentId
    };
    this.addSportsTournaments(this.sportTournamentData);
  }

  updateLinkClick(sportTournamentId:number){
    this.sportTournamentUpdate=sportTournamentId;
  }

}
