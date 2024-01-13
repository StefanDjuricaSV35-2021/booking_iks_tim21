import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { DaterangeReportComponent } from './components/daterange-report/daterange-report.component';
import { YearlyReportComponent } from './components/yearly-report/yearly-report.component';
import { ReportPageComponent } from './components/report-page/report-page.component';
import {NgxEchartsDirective} from "ngx-echarts";
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxEchartsConfig } from 'ngx-echarts/lib/ngx-echarts.directive';
import {NzButtonModule} from "ng-zorro-antd/button";
import {FormsModule} from "@angular/forms";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";

const echartsConfig: NgxEchartsConfig = {
  echarts: () => import('echarts'),
};


@NgModule({
  declarations: [
    DaterangeReportComponent,
    YearlyReportComponent,
    ReportPageComponent
  ],
    imports: [
        NzMessageModule,
        NgxEchartsModule.forRoot(echartsConfig),
        CommonModule,
        NgxEchartsDirective,
        NzButtonModule,
        FormsModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule
    ], exports: [DaterangeReportComponent, YearlyReportComponent, ReportPageComponent]
})
export class AnalyticsModule { }
