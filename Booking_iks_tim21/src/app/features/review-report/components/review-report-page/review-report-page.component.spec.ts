import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewReportPageComponent } from './review-report-page.component';

describe('ReviewReportPageComponent', () => {
  let component: ReviewReportPageComponent;
  let fixture: ComponentFixture<ReviewReportPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewReportPageComponent]
    });
    fixture = TestBed.createComponent(ReviewReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
