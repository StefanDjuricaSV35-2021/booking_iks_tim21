import { TimeSlot } from "src/app/core/models/timeSlot.model";

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
