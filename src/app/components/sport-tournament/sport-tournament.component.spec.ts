import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportTournamentComponent } from './sport-tournament.component';

describe('SportTournamentComponent', () => {
  let component: SportTournamentComponent;
  let fixture: ComponentFixture<SportTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
