import { Amenity } from './AccommodationDetailsDTO';

export interface AccommodationChangeRequestDTO {
  id: number;
  requestCreationDate: number;
  status: RequestStatus;
  accommodationId: number;
  ownerId: number;
  name: string;
  type: AccommodationType;
  minGuests: number;
  maxGuests: number;
  description: string;
  location: string;
  amenities: Amenity[];
  photos: string[];
  daysForCancellation: number;
  perNight: boolean;
  enabled: boolean;
}

export enum RequestStatus {
  PENDING,
  ACCEPTED,
  DECLINED,
}

enum AccommodationType {
  Room,
  House,
  Condo,
  Apartment,
}
