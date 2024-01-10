import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReportPageComponent } from './components/user-report-page/user-report-page.component';
import { UserReportComponent } from './components/user-report/user-report.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserReportPageComponent, UserReportComponent],
  imports: [CommonModule, FormsModule],
})
export class UserReportModule {}
