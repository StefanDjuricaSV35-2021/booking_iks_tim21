import {Component} from '@angular/core';
import {NotificationDTO, NotificationType} from "../../../core/models/NotificationDTO";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserService} from "../../../core/services/user/user-service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../../core/models/user.model";
import {NotificationUserService} from "../../../core/services/notification-user/notification-user.service";
import {NotificationTypeUpdateRequest} from "../../../core/models/NotificationTypeUpdateRequest";

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent {

  public userId:number;
  public userEmail:string;
  public notifications: NotificationDTO[];
  public notificationForm: {
    RESERVATION_REQUEST: boolean;
    RESERVATION_CANCELLATION: boolean;
    OWNER_REVIEW: boolean;
    ACCOMMODATION_REVIEW: boolean;
    RESERVATION_REQUEST_RESPONSE: boolean;
  } = {
    RESERVATION_REQUEST: false,
    RESERVATION_CANCELLATION: false,
    OWNER_REVIEW: false,
    ACCOMMODATION_REVIEW: false,
    RESERVATION_REQUEST_RESPONSE: false
  };
  constructor(
    private snackBar: MatSnackBar,
    private notificationUserService: NotificationUserService,
    private userService: UserService,
  ) {}
  ngOnInit() {
    const jwtHelperService = new JwtHelperService();
    const userFromLocalStorage: any = sessionStorage.getItem('user');
    this.userEmail =
      jwtHelperService.decodeToken(userFromLocalStorage).sub;

    this.userService.getUserByEmail(this.userEmail).subscribe({
      next: (data: User) => {
        this.userId = data.id;
        this.notificationUserService.getUserNotifications(this.userId).subscribe({
          next: (data: NotificationDTO[]) => {
            if(data!=null){
              this.notifications = data;
            }else{
              this.notifications = [];
            }
          },
        });
      },
    });

    this.userService.getUserNotificationTypes(this.userEmail).subscribe({
      next: (data: NotificationType[]) => {
        if(data!=null){
          data.forEach(type => {
            switch (type.toString()) {
              case 'RESERVATION_REQUEST':
                this.notificationForm.RESERVATION_REQUEST = true;
                break;
              case 'RESERVATION_CANCELLATION':
                this.notificationForm.RESERVATION_CANCELLATION = true;
                break;
              case 'OWNER_REVIEW':
                this.notificationForm.OWNER_REVIEW = true;
                break;
              case 'ACCOMMODATION_REVIEW':
                this.notificationForm.ACCOMMODATION_REVIEW = true;
                break;
              case 'RESERVATION_REQUEST_RESPONSE':
                this.notificationForm.RESERVATION_REQUEST_RESPONSE = true;
                break;
              default:
                break;
            }

          });
        }
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  submit(formValue: any){
    const types: NotificationType[] = [];

    if(formValue.RESERVATION_REQUEST){
      types.push(NotificationType.RESERVATION_REQUEST)
    }
    if(formValue.RESERVATION_CANCELLATION){
      types.push(NotificationType.RESERVATION_CANCELLATION)
    }
    if(formValue.OWNER_REVIEW){
      types.push(NotificationType.OWNER_REVIEW)
    }
    if(formValue.ACCOMMODATION_REVIEW){
      types.push(NotificationType.ACCOMMODATION_REVIEW)
    }
    if(formValue.RESERVATION_REQUEST_RESPONSE){
      types.push(NotificationType.RESERVATION_REQUEST_RESPONSE)
    }

    const request : NotificationTypeUpdateRequest = {
      userId : this.userId,
      subscribedNotificationTypes : types,
    }

    this.userService.updateUserNotificationTypes(request).subscribe({
      next: (data: User) => {
        this.snackBar.open("Updated notification settings!!!", 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
      },
      error: (error) => {
        this.snackBar.open("Something went wrong!!!", 'Close', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
        });
        console.error(error);
      }
    });
  }
}
