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
}

export enum ReservationStatus {
  Active, Cancelled
}
