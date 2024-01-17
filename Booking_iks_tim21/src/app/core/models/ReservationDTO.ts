import {TimeSlot} from "./timeSlot.model";
import {ReservationRequestStatus} from "./ReservationRequestDTO";

export class ReservationDTO{
  public id?: number;
  public userId: number;
  public accommodationId: number;
  public guestsNumber: number;
  public price: number;
  public timeSlot: TimeSlot;
  public status: ReservationStatus;

  constructor(userId: number, accommodationId: number, guestsNumber: number, price: number, timeSlot: TimeSlot, status: ReservationStatus) {
    this.userId = userId;
    this.accommodationId = accommodationId;
    this.guestsNumber = guestsNumber;
    this.price = price;
    this.timeSlot = timeSlot;
    this.status = status;
  }
}

export enum ReservationStatus {
  Active, Cancelled,Finished
}
