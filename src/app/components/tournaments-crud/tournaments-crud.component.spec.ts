import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentsCrudComponent } from './tournaments-crud.component';

describe('TournamentsCrudComponent', () => {
  let component: TournamentsCrudComponent;
  let fixture: ComponentFixture<TournamentsCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TournamentsCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
