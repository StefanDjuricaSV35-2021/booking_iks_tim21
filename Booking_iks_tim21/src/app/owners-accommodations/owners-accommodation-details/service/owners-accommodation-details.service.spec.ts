import { TestBed } from '@angular/core/testing';

import { OwnersAccommodationDetailsService } from './owners-accommodation-details.service';

describe('OwnersAccommodationDetailsService', () => {
  let service: OwnersAccommodationDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnersAccommodationDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
