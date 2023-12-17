import {Component, EventEmitter, Output} from '@angular/core';
import {AccommodationType} from "../../../../accommodation-details/model/AccommodationDetailsDTO";
import {MatRadioButton} from "@angular/material/radio";

@Component({
  selector: 'app-accommodation-type-form',
  templateUrl: './accommodation-type-form.component.html',
  styleUrls: ['./accommodation-type-form.component.css']
})
export class AccommodationTypeFormComponent {

  accommodationTypes:Array<string> = Object.keys(AccommodationType).filter(key => isNaN(+key));
  typeSelected:string|null=null;

  @Output() filterChange = new EventEmitter<string>();


  typeOptionSelect($event: MouseEvent, button: MatRadioButton) {

    if (this.typeSelected && this.typeSelected == button.value) {
      button.checked = false;
      this.typeSelected = null;
    } else {
      this.typeSelected = button.value
      button.checked = true;
    }
    this.filterChange.emit()
  }
}
