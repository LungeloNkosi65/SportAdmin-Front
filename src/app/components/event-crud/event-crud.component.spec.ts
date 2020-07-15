import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCrudComponent } from './event-crud.component';

describe('EventCrudComponent', () => {
  let component: EventCrudComponent;
  let fixture: ComponentFixture<EventCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
