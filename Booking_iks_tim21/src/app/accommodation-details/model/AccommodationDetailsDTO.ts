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
}

enum AccommodationType {
  Room,
  House,
  Condo,
  Apartment
}

enum Amenity {
  TV,
  WiFi,
  Parking,
  SmokeAlarm
}




