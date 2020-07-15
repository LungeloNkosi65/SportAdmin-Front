import { TestBed } from '@angular/core/testing';

import { TournamentbettypeService } from './tournamentbettype.service';

describe('TournamentbettypeService', () => {
  let service: TournamentbettypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TournamentbettypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
