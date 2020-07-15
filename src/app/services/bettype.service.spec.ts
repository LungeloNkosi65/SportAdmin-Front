import { TestBed } from '@angular/core/testing';

import { BettypeService } from './bettype.service';

describe('BettypeService', () => {
  let service: BettypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BettypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
