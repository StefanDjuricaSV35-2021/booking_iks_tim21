import {Component, EventEmitter, Output} from '@angular/core';
import {Amenity} from "../../../../accommodation-details/model/AccommodationDetailsDTO";

@Component({
  selector: 'app-amenity-form',
  templateUrl: './amenity-form.component.html',
  styleUrls: ['./amenity-form.component.css']
})
export class AmenityFormComponent {

  amenities: Array<string> = Object.keys(Amenity).filter(key => isNaN(+key));
  amenitiesSelected:Map<string,boolean>=new Map([]);

  @Output() filterChange = new EventEmitter<string>();



  amenityOptionSelect(amenity: string){
    this.amenitiesSelected.set(amenity,!(this.amenitiesSelected.get(amenity)));
    this.filterChange.emit()
  }

}
