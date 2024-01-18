import {Component, Input} from '@angular/core';
import { NotificationModule} from "../notification.module";
import {AccommodationReviewDTO} from "../../../core/models/AccommodationReviewDTO";
import {UserService} from "../../../core/services/user/user-service";
import {AccommodationReviewService} from "../../../core/services/accommodation-review/accommodation-review-service";
import {Location} from "@angular/common";
import {AuthService} from "../../../infrastructure/auth/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {User} from "../../../core/models/user.model";
import {NotificationDTO, NotificationType} from "../../../core/models/NotificationDTO";
import {NotificationUserService} from "../../../core/services/notification-user/notification-user.service";

@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.css']
})
export class NotificationViewComponent {
  @Input() not : NotificationDTO;

  constructor(
    private notificationUserService: NotificationUserService,
    private location: Location,
  ) {
  }

  deleteNotification(){
    if(this.not.id!= null){
      this.notificationUserService.deleteNotifications(this.not.id).subscribe({
        error: (error) => {
          console.error(error);
        }
      });

      this.location.replaceState(this.location.path());
      window.location.reload();
    }
  }
}
