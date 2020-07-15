import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SportCrudComponent } from './sport-crud.component';

describe('SportCrudComponent', () => {
  let component: SportCrudComponent;
  let fixture: ComponentFixture<SportCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
