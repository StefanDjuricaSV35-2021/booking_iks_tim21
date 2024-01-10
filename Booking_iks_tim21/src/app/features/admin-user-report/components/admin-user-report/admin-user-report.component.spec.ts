import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserReportComponent } from './admin-user-report.component';

describe('AdminUserReportComponent', () => {
  let component: AdminUserReportComponent;
  let fixture: ComponentFixture<AdminUserReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserReportComponent]
    });
    fixture = TestBed.createComponent(AdminUserReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
