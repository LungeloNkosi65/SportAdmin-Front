import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { TournamentsCrudComponent } from './components/tournaments-crud/tournaments-crud.component';
import { SportCrudComponent } from './components/sport-crud/sport-crud.component';
import { CountryCrudComponent } from './components/country-crud/country-crud.component';
import { SportCountryComponent } from './components/sport-country/sport-country.component';
import { SportTournamentComponent } from './components/sport-tournament/sport-tournament.component';
import { TournamentEventComponent } from './components/tournament-event/tournament-event.component';
import { TournamentBettypeComponent } from './components/tournament-bettype/tournament-bettype.component';
import { EventCrudComponent } from './components/event-crud/event-crud.component';
import { BetTypeComponent } from './components/bet-type/bet-type.component';
import { BetTypeMarketComponent } from './components/bet-type-market/bet-type-market.component';
import { MarketsComponent } from './components/markets/markets.component';
import { OddsComponent } from './components/odds/odds.component';
import {CommonModule} from '@angular/common';
@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
 
     ],
  declarations: [ AppComponent, TournamentsCrudComponent, 
    SportCrudComponent, CountryCrudComponent, SportCountryComponent, 
    SportTournamentComponent, TournamentEventComponent, TournamentBettypeComponent,
     EventCrudComponent, BetTypeComponent, BetTypeMarketComponent, MarketsComponent, OddsComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
