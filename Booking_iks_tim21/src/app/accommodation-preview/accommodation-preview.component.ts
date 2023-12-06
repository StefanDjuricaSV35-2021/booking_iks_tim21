import {Component, Input} from '@angular/core';
import {User} from "../profile/model/user.model";
import {AccommodationPreviewDTO} from "./model/accommodationPreviewDTO";

@Component({
  selector: 'app-accommodation-preview',
  templateUrl: './accommodation-preview.component.html',
  styleUrls: ['./accommodation-preview.component.css']
})
export class AccommodationPreviewComponent {

  @Input() accommodationPreview: AccommodationPreviewDTO;

}
