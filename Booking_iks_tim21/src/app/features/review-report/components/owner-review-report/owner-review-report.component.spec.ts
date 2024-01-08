import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerReviewReportComponent } from './owner-review-report.component';

describe('OwnerReviewReportComponent', () => {
  let component: OwnerReviewReportComponent;
  let fixture: ComponentFixture<OwnerReviewReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerReviewReportComponent]
    });
    fixture = TestBed.createComponent(OwnerReviewReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
