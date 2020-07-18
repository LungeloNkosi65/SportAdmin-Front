import { TestBed } from '@angular/core/testing';

import { BetTypeMarketService } from './bet-type-market.service';

describe('BetTypeMarketService', () => {
  let service: BetTypeMarketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetTypeMarketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
