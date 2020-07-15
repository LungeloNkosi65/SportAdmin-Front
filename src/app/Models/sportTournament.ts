import {Country} from '../Models/country';
import {Sport} from '../Models/sport';
import {Tournament} from '../Models/tournament';
export interface SportTournament{
    SportTourtnamentId:number;
    SportId:number;
    CountryId:number;
    TournamentId:number;
}