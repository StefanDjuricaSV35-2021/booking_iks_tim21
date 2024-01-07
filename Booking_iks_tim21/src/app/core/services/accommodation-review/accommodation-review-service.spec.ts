import { TestBed } from '@angular/core/testing';
import {AccommodationReviewService} from "./accommodation-review-service";


describe('AccommodationReviewService', () => {
  let service: AccommodationReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccommodationReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
