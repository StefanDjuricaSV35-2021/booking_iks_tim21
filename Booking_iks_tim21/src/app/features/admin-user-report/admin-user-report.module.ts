import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminUserReportPageComponent } from './components/admin-user-report-page/admin-user-report-page.component';
import { AdminUserReportComponent } from './components/admin-user-report/admin-user-report.component';

@NgModule({
  declarations: [AdminUserReportPageComponent, AdminUserReportComponent],
  imports: [CommonModule, FormsModule],
})
export class AdminUserReportModule {}
