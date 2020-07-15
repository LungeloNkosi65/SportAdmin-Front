import { TestBed } from '@angular/core/testing';

import { SportTreeService } from './sport-tree.service';

describe('SportTreeService', () => {
  let service: SportTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SportTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
