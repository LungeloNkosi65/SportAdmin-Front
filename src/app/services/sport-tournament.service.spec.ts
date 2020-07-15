import { TestBed } from '@angular/core/testing';

import { SportTournamentService } from './sport-tournament.service';

describe('SportTournamentService', () => {
  let service: SportTournamentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportTournamentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
