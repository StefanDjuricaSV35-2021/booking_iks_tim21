import { TestBed } from '@angular/core/testing';
import {OwnerReviewService} from "./owner-review.service";


describe('OwnerReviewService', () => {
  let service: OwnerReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
