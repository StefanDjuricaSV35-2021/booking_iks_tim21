import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaterangeReportComponent } from './daterange-report.component';

describe('DaterangeReportComponent', () => {
  let component: DaterangeReportComponent;
  let fixture: ComponentFixture<DaterangeReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DaterangeReportComponent]
    });
    fixture = TestBed.createComponent(DaterangeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
