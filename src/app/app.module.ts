import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule} from 'agm-direction'; // agm-direction
import { AppRoutingModule } from './app-routing.module';
import { AddBookingComponent } from './components/add-booking/add-booking.component';
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetch-data/fetch-data.component';
import { HomeComponent } from './components/home/home.component';
import { MapComponent } from './components/map/map.component';
import { NavMenueComponent } from './components/nav-menue/nav-menue.component';
import { CourseComponent } from './components/course/course.component';
import { FacultyComponent } from './components/faculty/faculty.component';
import { DepartmentComponent } from './components/department/department.component';
import { StudentsComponent } from './components/students/students.component';
import { HttpClientModule } from '@angular/common/http';
import { TournamentsCrudComponent } from './components/tournaments-crud/tournaments-crud.component';
import { SportCrudComponent } from './components/sport-crud/sport-crud.component';
import { CountryCrudComponent } from './components/country-crud/country-crud.component';
import { SportCountryComponent } from './components/sport-country/sport-country.component';
import { SportTournamentComponent } from './components/sport-tournament/sport-tournament.component';
import { TournamentEventComponent } from './components/tournament-event/tournament-event.component';
import { TournamentBettypeComponent } from './components/tournament-bettype/tournament-bettype.component';
import { EventCrudComponent } from './components/event-crud/event-crud.component';
@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({ //@agm/core
      apiKey: 'AIzaSyDdl92Jhloy3TczguBxXwqD5AH3m2oCNY0',
       libraries: ["places"]
    }),
    AgmDirectionModule //agm-direction
     ],
  declarations: [ AppComponent, AddBookingComponent, CounterComponent, FetchDataComponent, HomeComponent, MapComponent, NavMenueComponent, CourseComponent, FacultyComponent, DepartmentComponent, StudentsComponent, TournamentsCrudComponent, SportCrudComponent, CountryCrudComponent, SportCountryComponent, SportTournamentComponent, TournamentEventComponent, TournamentBettypeComponent, EventCrudComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
