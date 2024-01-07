import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReviewPageComponent } from './accommodation-review-page.component';

describe('AccommodationReviewPageComponent', () => {
  let component: AccommodationReviewPageComponent;
  let fixture: ComponentFixture<AccommodationReviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationReviewPageComponent]
    });
    fixture = TestBed.createComponent(AccommodationReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
