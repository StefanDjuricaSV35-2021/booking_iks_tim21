import { Component } from '@angular/core';
import {AccommodationPreviewDTO} from "../../../../accommodation-preview/model/accommodationPreviewDTO";

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent {

  selectedAmmenities:string[];
  public ammenityTypes: string[]=["a","b","c"];

  selectedPropertyTypes:string[];
  public propertyTypes: string[]=["a","b","c"];


  onNgModelChange(value:string){
    return;
  }

}
