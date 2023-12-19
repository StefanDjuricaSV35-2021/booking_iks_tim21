export class AccommodationDetailsDTO {
  id: number;
  ownerId: number;
  name: string;
  type: AccommodationType;
  location: string;
  minGuests: number;
  maxGuests: number;
  description: string;
  amenities: Amenity[];
  photos: string[];
  daysForCancellation: number;
  perNight: boolean;
  enabled: boolean;
  dates?:string[];
}

export enum AccommodationType {
  Room,
  House,
  Condo,
  Apartment,
}

export enum Amenity {
  Tv,
  WiFi,
  Parking,
  SmokeAlarm,
}
