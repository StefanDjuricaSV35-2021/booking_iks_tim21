import { RequestStatus } from './AccommodationChangeRequestDTO';
import {TimeSlot} from "./timeSlot.model";

export interface AccommodationPricingChangeRequestDTO {
  id?: number;
  accommodationChangeRequestId?: number;
  status: RequestStatus;
  accommodationId: number;
  timeSlot: TimeSlot;
  price: number;
}
