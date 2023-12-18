import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AmenityFormComponent} from "../amenity-form/amenity-form.component";
import {AccommodationTypeFormComponent} from "../accommodation-type-form/accommodation-type-form.component";
import {AccommodationType, Amenity} from "../../../../accommodation-details/model/AccommodationDetailsDTO";
import {PriceRangeFormComponent} from "../price-range-form/price-range-form.component";

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {

  @ViewChild(PriceRangeFormComponent) priceForm;
  @ViewChild(AmenityFormComponent) amenityForm;
  @ViewChild(AccommodationTypeFormComponent) typeForm;
  params:string[]=[];

  constructor(
    private route: ActivatedRoute,
    private router:Router,

  ) {}

  ngAfterViewInit() {
    this.setFilterFormUpdater();
  }


  setFilterFormUpdater(){

    this.route.queryParams.subscribe(params => {

      if(params['filters']==null){
        return
      }

      let selectedFilters: string[] = params['filters'].split(';');
      selectedFilters.pop();

      this.params=selectedFilters;

      this.setFilterSelections(this.params)

    })
  }

  setFilterSelections(selectedFilters:string[]){
    console.log("a")
    for ( let filterOption of selectedFilters) {

      let typeAndValue:string[]=filterOption.split("=")

      let type:string=typeAndValue[0];
      let value:string=typeAndValue[1];

      switch(type) {
        case "Amenity": {
          this.amenityForm.amenitiesSelected.set(Amenity[+value],true);
          break;
        }
        case "AccommodationType": {
          this.typeForm.typeSelected=AccommodationType[+value];
          break;
        }
        case "MinPrice": {
          this.priceForm.minVal=value;
          break;
        }
        case "MaxPrice": {
          this.priceForm.maxVal=value;
          break;
        }
        default: {
          //statements;
          break;
        }
      }

    }
  }

  setUrlParams(){

    let combinedFilterOptions:string|null=this.generateUrlParamString();


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
  generateUrlParamString() {

    let combinedFilterOptions:string="";

    for (const filter of this.params) {

      combinedFilterOptions+=filter+";";

    }

    return combinedFilterOptions;

  }
  addParam(newParam:string){

    this.params.push(newParam);

  }

  delParam(oldParam:string){

    this.params.forEach( (item, index) => {
      if(item === oldParam) this.params.splice(index,1);
    });

  }

  editParam(params:{oldParam:string,newParam:string}){

    this.delParam(params.oldParam);
    this.addParam(params.newParam)

  }

}
