import { TestBed } from '@angular/core/testing';

import { AccommodationPreviewService } from './accommodation-preview.service';

describe('AccommodationPreviewService', () => {
  let service: AccommodationPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
