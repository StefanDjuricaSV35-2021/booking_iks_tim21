export class AccommodationDetailsDTO {
   id: number;
   ownerId: number;
   name: string;
   type: AccommodationType;
   location: string;
   minGuests: number;
   maxGuests: number;
   description: string;
   amenities: Set<Amenity>;
   photos: Set<string>;
   daysForCancellation: number;
   details:string;
}

export enum AccommodationType {
  Room,
  House,
  Condo,
  Apartment
}

export enum Amenity {
  Tv,
  WiFi,
  Parking,
  SmokeAlarm
}




