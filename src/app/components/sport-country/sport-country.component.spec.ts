import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportCountryComponent } from './sport-country.component';

describe('SportCountryComponent', () => {
  let component: SportCountryComponent;
  let fixture: ComponentFixture<SportCountryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportCountryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
