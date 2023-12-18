import {Component} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {AccommodationDetailsDTO} from "./model/AccommodationDetailsDTO";
import {ActivatedRoute} from "@angular/router";
import {AccommodationDetailsService} from "./service/accommodation-details.service";
import {SharedModule} from "../../../../shared/shared.module";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css'],
})
export class AccommodationDetailsComponent {
  selected: null | undefined;
  id:number;
  acc:AccommodationDetailsDTO;
  constructor(private route: ActivatedRoute,private service: AccommodationDetailsService) {}
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!

    this.service.findById(this.id).subscribe(data => {
      this.acc = data;
    });
  }
  protected readonly Array = Array;

}
