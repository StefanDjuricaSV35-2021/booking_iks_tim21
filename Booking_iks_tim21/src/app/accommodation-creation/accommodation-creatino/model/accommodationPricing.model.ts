import { TimeSlot } from "./timeSlot.model";

export class AccommodationPricingDTO {
    id?: number | 0;
    accommodationId: number;
    timeSlot:TimeSlot;
    price: number;

    constructor(data: Partial<AccommodationPricingDTO> = {}) {
        this.id = data.id !== undefined ? data.id : 0;
        this.accommodationId = data.accommodationId || 0;
        this.timeSlot = data.timeSlot || new TimeSlot();
        this.price = data.price || 0;
    }
}