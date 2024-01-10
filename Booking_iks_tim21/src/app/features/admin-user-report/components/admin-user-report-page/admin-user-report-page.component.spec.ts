import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserReportPageComponent } from './admin-user-report-page.component';

describe('AdminUserReportPageComponent', () => {
  let component: AdminUserReportPageComponent;
  let fixture: ComponentFixture<AdminUserReportPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminUserReportPageComponent]
    });
    fixture = TestBed.createComponent(AdminUserReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
