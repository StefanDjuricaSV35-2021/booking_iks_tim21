import {Component, Input} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe, formatDate} from "@angular/common";
import {Router} from "@angular/router";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {SearchPageService} from "../../../features/search/components/search-results-page/service/search-page.service";
import {AccommodationPreviewDTO} from "../../../accommodation-preview/model/accommodationPreviewDTO";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

    accommodationPreviews:AccommodationPreviewDTO;

   @Input() location:string;
   @Input() noGuests:number;
   @Input() dateFrom:string;
   @Input() dateTo:string;

   searchForm:FormGroup;
   formBuilder=new FormBuilder();
   date:FormControl;
   date2:FormControl;

   constructor(private router:Router) {}
   ngOnInit(){

      this.configureFormGroup()

   }

   configureFormGroup(){
       this.searchForm = this.formBuilder.group({
           location:[new Date(this.dateTo), Validators.required],
           noGuests:[Validators.pattern('^[0-9]*$'), Validators.required]
       });

       this.date = new FormControl(new Date(this.dateFrom),Validators.required)
       this.date2 = new FormControl(new Date(this.dateTo),Validators.required)
       this.searchForm.addControl('arrival',this.date)
       this.searchForm.addControl('departure',this.date2)
   }

    validateForm() {
        if (this.searchForm.invalid) {
            this.searchForm.get('location')?.markAsTouched();
            this.searchForm.get('noGuests')?.markAsTouched();
            this.searchForm.get('arrival')?.markAsTouched();
            this.searchForm.get('departure')?.markAsTouched();
            return;
        }else{
            this.router.navigate(['/search'],{ queryParams: {'location':this.location,'dateFrom':this.dateFrom,'dateTo':this.dateTo,'noGuests':this.noGuests}});
        }
    }

    arrivalChanged($event: HTMLInputElement) {
        this.dateFrom=formatDate(new Date($event.value),'yyyy-MM-dd','en_US');
    }
    departureChanged($event: HTMLInputElement) {
        this.dateTo=formatDate(new Date($event.value),'yyyy-MM-dd','en_US');
    }
}
