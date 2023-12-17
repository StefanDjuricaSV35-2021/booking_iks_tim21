import {Component, EventEmitter, Output} from '@angular/core';
import {AccommodationPreviewDTO} from "../../../../accommodation-preview/model/accommodationPreviewDTO";
import {filter} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchPageService} from "../search-results-page/service/search-page.service";
import {AccommodationType, Amenity} from "../../../../accommodation-details/model/AccommodationDetailsDTO";

@Component({
  selector: 'app-filter-sidebar',
  templateUrl: './filter-sidebar.component.html',
  styleUrls: ['./filter-sidebar.component.css']
})
export class FilterSidebarComponent {

  amenities: Array<string> = Object.keys(Amenity).filter(key => isNaN(+key));
  propertyTypes:Array<string> = Object.keys(AccommodationType).filter(key => isNaN(+key));
  amenitiesSelected:Map<string,boolean>=new Map([]);
  propertySelected:Map<string,boolean>=new Map([]);
  constructor(
    private route: ActivatedRoute,
    private router:Router,

) {}

  @Output() filterSelectionEvent = new EventEmitter<string>();

  ngOnInit(){
    this.initializeFields()
    this.setSelectedFilters();
  }

  initializeFields(){
    for (const amenity in this.amenities) {
        this.amenitiesSelected.set(amenity,false)
    }
    for (const propertyType in this.propertyTypes) {
      this.propertySelected.set(propertyType,false)
    }
  }

  setSelectedFilters(){

    this.route.queryParams.subscribe(params => {

      let selectedFilters:string[] = params['filters'].split(';');
      selectedFilters.pop()
      console.log(selectedFilters)

      for ( let filterOption of selectedFilters) {
        let typeAndValue:string[]=filterOption.split("=")
        let type:string=typeAndValue[0];
        let value:string=typeAndValue[1];

        if(type=='Amenity'){
          this.amenitiesSelected.set(Amenity[+value],true);

        }
        else if(type=='PropertyType'){
          this.propertySelected.set(AccommodationType[+value] ,true);
        }

      }

    });
  }

  amenityOptionSelect(amenity: string){

    this.amenitiesSelected.set(amenity,!(this.amenitiesSelected.get(amenity)));
    this.applyFilters();
  }

  propertyTypeOptionSelect(propertyType: string){
    this.propertySelected.set(propertyType,!(this.propertySelected.get(propertyType)));
    this.applyFilters();
  }

  applyFilters(){

    let combinedFilterOptions:string|null=this.generateFilterParam();

    if (combinedFilterOptions==""){
      combinedFilterOptions=null;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        filters:combinedFilterOptions
      },
      queryParamsHandling: 'merge',

    });

  }

  generateFilterParam() {


    let combinedFilterOptions:string="";

    for ( let amenity of this.amenitiesSelected.keys()) {

      if (this.amenitiesSelected.get(amenity)){
        combinedFilterOptions+=('Amenity='+Amenity[amenity as keyof typeof Amenity]+";");
      }

    }

    for (let propertyType of this.propertySelected.keys()) {

      if (this.propertySelected.get(propertyType)){
        combinedFilterOptions+=('PropertyType='+AccommodationType[propertyType as keyof typeof AccommodationType]+';');
      }

    }

    return combinedFilterOptions;

  }

  protected readonly Amenity = Amenity;
  protected readonly AccommodationType = AccommodationType;
}
