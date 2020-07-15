import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentBettypeComponent } from './tournament-bettype.component';

describe('TournamentBettypeComponent', () => {
  let component: TournamentBettypeComponent;
  let fixture: ComponentFixture<TournamentBettypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentBettypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentBettypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
