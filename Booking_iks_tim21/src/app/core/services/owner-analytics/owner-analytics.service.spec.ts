import { TestBed } from '@angular/core/testing';

import { OwnerAnalyticsService } from './owner-analytics.service';

describe('OwnerAnalyticsService', () => {
  let service: OwnerAnalyticsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerAnalyticsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
