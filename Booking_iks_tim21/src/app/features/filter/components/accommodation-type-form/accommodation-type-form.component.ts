import {Component, EventEmitter, Output} from '@angular/core';
import {MatRadioButton} from "@angular/material/radio";
import {
  AccommodationType
} from "../../../view-accommodation/components/accommodation-details/model/AccommodationDetailsDTO";

@Component({
  selector: 'app-accommodation-type-form',
  templateUrl: './accommodation-type-form.component.html',
  styleUrls: ['./accommodation-type-form.component.css']
})
export class AccommodationTypeFormComponent {

  accommodationTypes:Array<string> = Object.keys(AccommodationType).filter(key => isNaN(+key));
  typeSelected:string|null=null;

  @Output() editType = new EventEmitter<{oldParam: string, newParam: string}>();
  @Output() deleteType = new EventEmitter<string>();
  @Output() addType = new EventEmitter<string>();


  typeOptionSelect($event: MouseEvent, button: MatRadioButton) {

    let prevSelectedType=this.typeSelected;

    //delete
    if (this.typeSelected && this.typeSelected == button.value) {
      button.checked = false;
      this.typeSelected = null;

      this.deleteType.emit("AccommodationType="+AccommodationType[prevSelectedType as keyof typeof AccommodationType].toString())
    }
    //add||edit
    else{
        this.typeSelected = button.value
        button.checked = true;

        if(prevSelectedType==null){
          let newParam="AccommodationType="+AccommodationType[this.typeSelected as keyof typeof AccommodationType].toString()
          this.addType.emit(newParam);
        }else{
          let oldParam="AccommodationType="+AccommodationType[prevSelectedType as keyof typeof AccommodationType].toString();
          let newParam="AccommodationType="+AccommodationType[this.typeSelected as keyof typeof AccommodationType].toString()

          this.editType.emit({oldParam,newParam})
        }
    }
  }
}
