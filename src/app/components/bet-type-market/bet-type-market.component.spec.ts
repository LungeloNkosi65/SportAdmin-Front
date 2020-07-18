import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetTypeMarketComponent } from './bet-type-market.component';

describe('BetTypeMarketComponent', () => {
  let component: BetTypeMarketComponent;
  let fixture: ComponentFixture<BetTypeMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetTypeMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetTypeMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
