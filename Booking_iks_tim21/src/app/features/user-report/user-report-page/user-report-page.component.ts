import { Component } from '@angular/core';
import {UserService} from "../../../core/services/user/user-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../../core/models/user.model";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {UserReportService} from "../../../core/services/user-report/user-report-service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserReportModule} from "../user-report.module";
import {UserReportDTO} from "../../../core/models/UserReportDTO";

@Component({
  selector: 'app-user-report-page',
  templateUrl: './user-report-page.component.html',
  styleUrls: ['./user-report-page.component.css']
})
export class UserReportPageComponent {
  public userId:number;
  public role:string;
  public reportableUsers: User[];
  selectedUserIndex: number | null = null;
  public description:string;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private userReportService: UserReportService,
  ) {}

  ngOnInit() {
    const jwtHelperService = new JwtHelperService();
    const userFromLocalStorage: any = sessionStorage.getItem('user');
    const userEmail: string =
      jwtHelperService.decodeToken(userFromLocalStorage).sub;

    this.userService.getUserByEmail(userEmail).subscribe({
      next: (data: User) => {
        this.userId = data.id;

        this.authService.userState.subscribe((result) => {
          this.role=result;
          if(this.role == 'OWNER'){
            this.userReportService.getOwnersGuests(this.userId).subscribe({
              next: (data: User[]) => {
                this.reportableUsers = data;
              },
            });

          }else if(this.role == 'GUEST'){
            this.userReportService.getGuestsOwners(this.userId).subscribe({
              next: (data: User[]) => {
                this.reportableUsers = data;
              },
            });
          }else{
            this.snackBar.open("Something went wrong with your role.", 'Close', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
            this.router.navigate(['homePage']);
          }
        });
      },
    });
  }

  handleCardSelection(index: number) {
    if(this.selectedUserIndex === index){
      this.selectedUserIndex = null;
    }else{
      this.selectedUserIndex = index;
    }
  }
  reportUser(){
    if(this.selectedUserIndex !== null){
      const selectedUser = this.reportableUsers[this.selectedUserIndex];

      const userReport:UserReportDTO = {
        id: 0,
        reportedId: selectedUser.id,
        reporterId: this.userId,
        description: this.description,
      }

      this.userReportService.createUserReport(userReport).subscribe({
        next: (data: UserReportDTO) => {
          this.snackBar.open("Successfully reported user: "+data.reportedId+"!!", 'Close', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
      });


    }else{
      this.snackBar.open("Before reporting a user please select a user to report.", 'Close', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
  }
}
