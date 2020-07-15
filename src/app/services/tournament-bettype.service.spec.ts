import { TestBed } from '@angular/core/testing';

import { TournamentBettypeService } from './tournament-bettype.service';

describe('TournamentBettypeService', () => {
  let service: TournamentBettypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentBettypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
