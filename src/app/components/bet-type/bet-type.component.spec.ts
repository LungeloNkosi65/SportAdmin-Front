import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetTypeComponent } from './bet-type.component';

describe('BetTypeComponent', () => {
  let component: BetTypeComponent;
  let fixture: ComponentFixture<BetTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
