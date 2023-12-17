import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AmenityFormComponent} from "../amenity-form/amenity-form.component";
import {AccommodationTypeFormComponent} from "../accommodation-type-form/accommodation-type-form.component";
import {AccommodationType, Amenity} from "../../../../accommodation-details/model/AccommodationDetailsDTO";

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {

  @ViewChild(AmenityFormComponent) amenityForm;
  @ViewChild(AccommodationTypeFormComponent) typeForm;

  constructor(
    private route: ActivatedRoute,
    private router:Router,

  ) {}

  ngOnInit(){
  }

  ngAfterViewInit() {
    this.setParamObserver()
  }


  setParamObserver(){

    this.route.queryParams.subscribe(params => {

      let selectedFilters: string[] = params['filters'].split(';');
      selectedFilters.pop();

      this.setSelectionMaps(selectedFilters);

    })
  }

  setSelectionMaps(selectedFilters:string[]){

    for ( let filterOption of selectedFilters) {

      console.log(filterOption)
      let typeAndValue:string[]=filterOption.split("=")
      let type:string=typeAndValue[0];
      let value:string=typeAndValue[1];

      if(type=='Amenity'){
        this.amenityForm.amenitiesSelected.set(Amenity[+value],true);
      }
      else if(type=='AccommodationType'){
        console.log(AccommodationType[+value])
        this.typeForm.typeSelected=AccommodationType[+value];
      }

    }
  }

  applyFilters(){

    let combinedFilterOptions:string|null=this.generateFilterParamString();

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

  generateFilterParamString() {

    let combinedFilterOptions:string="";

    combinedFilterOptions+=this.generateTypeParamString();
    combinedFilterOptions+=this.generateAmenityParamString();

    return combinedFilterOptions;

  }

  generateAmenityParamString(){

    let amenityFilterOptions:string="";

    for ( let amenity of this.amenityForm.amenitiesSelected.keys()) {

      if (this.amenityForm.amenitiesSelected.get(amenity)){
        amenityFilterOptions+=('Amenity='+Amenity[amenity as keyof typeof Amenity]+";");
      }

    }

    return amenityFilterOptions

  }

  generateTypeParamString(){

    let typeFilterOptions="";

    if(this.typeForm.typeSelected!=null){
      console.log(this.typeForm.typeSelected)
      typeFilterOptions+="AccommodationType="+AccommodationType[this.typeForm.typeSelected as keyof typeof AccommodationType]+";";
    }


    return typeFilterOptions;
  }

}
