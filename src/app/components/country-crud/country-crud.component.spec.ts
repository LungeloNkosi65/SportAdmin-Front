import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryCrudComponent } from './country-crud.component';

describe('CountryCrudComponent', () => {
  let component: CountryCrudComponent;
  let fixture: ComponentFixture<CountryCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
