import { TestBed } from '@angular/core/testing';

import { AccommodationChangeRequestService } from './accommodation-change-request.service';

describe('AccommodationChangeRequestService', () => {
  let service: AccommodationChangeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationChangeRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
