import { TestBed } from '@angular/core/testing';

import { AccommodationPricingChangeRequestService } from './accommodation-pricing-change-request.service';

describe('AccommodationPricingChangeRequestService', () => {
  let service: AccommodationPricingChangeRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationPricingChangeRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
