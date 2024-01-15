export enum NotificationType {
  RESERVATION_REQUEST,
  RESERVATION_CANCELLATION,
  OWNER_REVIEW,
  ACCOMMODATION_REVIEW,
  RESERVATION_REQUEST_RESPONSE
}

export class NotificationDTO{
  id?:number;
  type:NotificationType;
  message:string;
  recipientId:number;

  constructor(type: NotificationType, message: string, recipientId: number) {
    this.type = type;
    this.message = message;
    this.recipientId = recipientId;
  }

}
