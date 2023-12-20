import { TimeSlot } from 'src/app/accommodation-creation/accommodation-creation/model/timeSlot.model';
import { RequestStatus } from './AccommodationChangeRequestDTO';

export interface AccommodationPricingChangeRequestDTO {
  id?: number;
  accommodationChangeRequestId?: number;
  status: RequestStatus;
  accommodationId: number;
  timeSlot: TimeSlot;
  price: number;
}
