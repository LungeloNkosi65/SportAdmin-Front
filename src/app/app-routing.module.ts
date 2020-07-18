import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TournamentsCrudComponent } from './components/tournaments-crud/tournaments-crud.component';
import { SportCrudComponent } from './components/sport-crud/sport-crud.component';
import { CountryCrudComponent } from './components/country-crud/country-crud.component';
import { SportCountryComponent } from './components/sport-country/sport-country.component';
import { SportTournamentComponent } from './components/sport-tournament/sport-tournament.component';
import { TournamentBettypeComponent } from './components/tournament-bettype/tournament-bettype.component';
import { EventCrudComponent } from './components/event-crud/event-crud.component';
import { BetTypeComponent } from './components/bet-type/bet-type.component';
import {MarketsComponent} from './components/markets/markets.component';
import { BetTypeMarketComponent } from './components/bet-type-market/bet-type-market.component';
import {OddsComponent} from './components/odds/odds.component';

const routes: Routes = [
  {path:'', component:SportCrudComponent},

  {path:'sport/tournaments', component:TournamentsCrudComponent},
  {path:'sport/sports', component:SportCrudComponent},
  {path:'sport/countries', component:CountryCrudComponent},
  {path:'sport/linkSport', component:SportCountryComponent},
  {path:'sport/linkTournament', component:SportTournamentComponent},
  {path:'sport/linkBetType', component:TournamentBettypeComponent},
  {path:'sport/event', component:EventCrudComponent},
  {path:'sport/betType', component:BetTypeComponent},
  {path:'sport/market', component:MarketsComponent},
  {path:'sport/batTypeMarket', component:BetTypeMarketComponent},
  {path:'sport/odds', component:OddsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
