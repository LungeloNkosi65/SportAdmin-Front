import { TestBed } from '@angular/core/testing';

import { SportCountryEventService } from './sport-country-event.service';

describe('SportCountryEventService', () => {
  let service: SportCountryEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportCountryEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
