import { Sport } from './sport';
import { Country } from './country';

export interface SportCountry{
    SportCountryId:number,
    SportId:number;
    CountryId:number;
    Country:Country;
    Sport:Sport;
}