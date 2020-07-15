import { TestBed } from '@angular/core/testing';

import { SportsCountryService } from './sports-country.service';

describe('SportsCountryService', () => {
  let service: SportsCountryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportsCountryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
