import {NotificationType} from "./NotificationDTO";

export class NotificationTypeUpdateRequest{
  userId:number;
  subscribedNotificationTypes:NotificationType[];
}


