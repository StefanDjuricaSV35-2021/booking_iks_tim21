import { Component } from '@angular/core';
import { UserReportDTO } from 'src/app/core/models/UserReportDTO';
import { UserReportService } from 'src/app/core/services/user-report/user-report.service';
import { UserService } from 'src/app/core/services/user/user-service';

@Component({
  selector: 'app-user-report-page',
  templateUrl: './user-report-page.component.html',
  styleUrls: ['./user-report-page.component.css'],
})
export class UserReportPageComponent {
  public userReports: UserReportDTO[];
  constructor(
    private userReportService: UserReportService,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.userReportService.getUserReports().subscribe({
      next: (data: UserReportDTO[]) => {
        this.userReports = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
