import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationReviewReportComponent } from './accommodation-review-report.component';

describe('AccommodationReviewReportComponent', () => {
  let component: AccommodationReviewReportComponent;
  let fixture: ComponentFixture<AccommodationReviewReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationReviewReportComponent]
    });
    fixture = TestBed.createComponent(AccommodationReviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
