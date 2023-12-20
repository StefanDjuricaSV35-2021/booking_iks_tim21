import {Component, EventEmitter, Output, signal} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-price-range-form',
  templateUrl: './price-range-form.component.html',
  styleUrls: ['./price-range-form.component.css']
})
export class PriceRangeFormComponent {

  minVal:string="";
  maxVal:string="";

  @Output() addPrice = new EventEmitter<string>();
  @Output() removePrice = new EventEmitter<string>();
  @Output() editPrice = new EventEmitter<{oldParam: string, newParam: string}>();


  minChange(number: string) {
    this.emitPrice(number,this.minVal,"MinPrice")
    this.minVal=number
  }

  maxChange(number:string) {

    this.emitPrice(number,this.maxVal,"MaxPrice")
    this.maxVal=number

  }

  emitPrice(newPrice:string,oldPrice:string,type:string){
    if(newPrice!="" && oldPrice!=""){//edit

      let oldParam=type+'='+oldPrice;
      let newParam=type+'='+newPrice
      this.editPrice.emit({oldParam,newParam});


    }else if(newPrice!="" && oldPrice==""){//add

      this.addPrice.emit(type+'='+newPrice);

    }else if(newPrice=="" && oldPrice!=""){//del

      this.removePrice.emit(type+'='+oldPrice);

    }

  }

}
