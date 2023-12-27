import { TestBed } from '@angular/core/testing';

import { FavoriteAccommodationService } from './favorite-accommodation.service';

describe('FavoriteAccommodationService', () => {
  let service: FavoriteAccommodationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoriteAccommodationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
