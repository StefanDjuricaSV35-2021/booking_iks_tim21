import { TestBed } from '@angular/core/testing';

import { OwnersAccommodationPreviewService } from './owners-accommodation-preview.service';

describe('OwnersAccommodationPreviewService', () => {
  let service: OwnersAccommodationPreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnersAccommodationPreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
