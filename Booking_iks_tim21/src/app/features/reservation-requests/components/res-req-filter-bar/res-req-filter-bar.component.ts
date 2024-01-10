import {Component, EventEmitter, Output} from '@angular/core';
import {ReservationRequestStatus} from "../../../../core/models/ReservationRequestDTO";
import {AccommodationType} from "../../../../core/models/AccommodationDetailsDTO";
import {MatRadioButton} from "@angular/material/radio";

@Component({
  selector: 'app-res-req-filter-bar',
  templateUrl: './res-req-filter-bar.component.html',
  styleUrls: ['./res-req-filter-bar.component.css']
})
export class ResReqFilterBarComponent {

  checkedStatus=false;
  @Output() changeStatus = new EventEmitter<string|undefined>();
  @Output() changeName = new EventEmitter<string>();



  resReqStatuses:Array<string> = Object.keys(ReservationRequestStatus).filter(key => isNaN(+key));
  protected readonly ReservationRequestStatus = ReservationRequestStatus;

  statusOptionSelect($event: MouseEvent, button: MatRadioButton) {
    if(button.checked){
      button.checked=false;
      this.changeStatus.emit(undefined)

    }else {
      this.changeStatus.emit(button.value)
    }
  }

  nameChange(value: string) {
    this.changeName.emit(value)
  }
}
