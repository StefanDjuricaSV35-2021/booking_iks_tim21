import {TimeSlot} from "./timeSlot.model";

export class ReservationRequestDTO {
  private id?: number;
  private userId: number;
  private accommodationId: number;
  private guestsNumber: number;
  private price: number;
  private timeSlot: TimeSlot;
  private status: ReservationRequestStatus;

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
