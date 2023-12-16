export interface AccommodationChangeRequestDTO {
  id: number;
  requestCreationDate: number;
  status: RequestStatus;
  accommodationId?: number;
  ownerId?: number;
  name?: string;
  type?: string;
  minGuests?: number;
  maxGuests?: number;
  description?: string;
  location?: string;
  amenities?: string[];
  photos?: string[];
  daysForCancellation?: number;
  perNight?: boolean;
  enabled?: boolean;
}

export enum RequestStatus {
  PENDING,
  ACCEPTED,
  DECLINED,
}
