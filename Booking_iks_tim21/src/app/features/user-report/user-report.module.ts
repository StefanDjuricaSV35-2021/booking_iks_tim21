import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserReportPageComponent } from './user-report-page/user-report-page.component';
import { UserReportComponent } from './user-report/user-report.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserReportPageComponent,
    UserReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserReportModule { }
