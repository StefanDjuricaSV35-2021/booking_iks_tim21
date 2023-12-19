import { TimeSlot } from "src/app/accommodation-creation/accommodation-creation/model/timeSlot.model";

export interface AccommodationPricingChangeRequestDTO {
  id?: number;
  accommodationChangeRequestId?: number;
  status: RequestStatus;
  accommodationId: number;
  timeSlot: TimeSlot;
  price: number;
}

export enum RequestStatus {
  PENDING,
  ACCEPTED,
  DECLINED,
}
