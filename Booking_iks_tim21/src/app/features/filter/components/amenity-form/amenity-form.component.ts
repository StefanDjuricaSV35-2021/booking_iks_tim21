import {Component, EventEmitter, Output} from '@angular/core';
import {Amenity} from "../../../view-accommodation/components/accommodation-details/model/AccommodationDetailsDTO";

@Component({
  selector: 'app-amenity-form',
  templateUrl: './amenity-form.component.html',
  styleUrls: ['./amenity-form.component.css']
})
export class AmenityFormComponent {

  amenities: Array<string> = Object.keys(Amenity).filter(key => isNaN(+key));
  amenitiesSelected:Map<string,boolean>=new Map([]);

  @Output() removedAmenity = new EventEmitter<string>();
  @Output() addedAmenity = new EventEmitter<string>();


  amenityOptionSelect(amenity: string){
    this.amenitiesSelected.set(amenity,!(this.amenitiesSelected.get(amenity)));

    let param="Amenity="+Amenity[amenity as keyof typeof Amenity].toString()

    if(this.amenitiesSelected.get(amenity)){
      this.addedAmenity.emit(param)
    }else {
      this.removedAmenity.emit(param)
    }
  }



}
