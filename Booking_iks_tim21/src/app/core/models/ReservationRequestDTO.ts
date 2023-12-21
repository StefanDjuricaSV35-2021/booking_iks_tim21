import {TimeSlot} from "./timeSlot.model";

export class ReservationRequestDTO {
  public id?: number;
  public userId: number;
  public accommodationId: number;
  public guestsNumber: number;
  public price: number;
  public timeSlot: TimeSlot;
  public status: ReservationRequestStatus;

  constructor( userId: number, accommodationId: number, guestsNumber: number, price: number, timeSlot: TimeSlot, status: ReservationRequestStatus) {
    this.userId = userId;
    this.accommodationId = accommodationId;
    this.guestsNumber = guestsNumber;
    this.price = price;
    this.timeSlot = timeSlot;
    this.status = status;
  }

}

export enum ReservationRequestStatus {
  Accepted, Declined, Cancelled, Waiting
}
