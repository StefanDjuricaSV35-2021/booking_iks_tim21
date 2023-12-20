import {Component} from '@angular/core';
import {MatCalendarCellCssClasses, MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {AccommodationDetailsDTO} from "../../../../core/models/AccommodationDetailsDTO";
import {ActivatedRoute} from "@angular/router";
import {AccommodationDetailsService} from "../../../../core/services/accommodation-details/accommodation-details.service";
import {SharedModule} from "../../../../shared/shared.module";
import {MatDialog} from "@angular/material/dialog";
import {MapComponent} from "../../../../shared/components/map/map.component";

@Component({
  selector: 'app-accommodation-details-page',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css'],
})
export class AccommodationDetailsComponent {
  selected: null | undefined;
  id:number;
  acc:AccommodationDetailsDTO;
  constructor(private route: ActivatedRoute,private service: AccommodationDetailsService,public dialog: MatDialog){}
  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!
    this.service.findById(this.id).subscribe(data => {
      this.acc = data;
    });
  }

  openMap() {
    this.dialog.open(MapComponent,{
      data:{
        location:this.acc.location
      }
    });
  }

  protected readonly Array = Array;

  protected readonly encodeURIComponent = encodeURIComponent;
}
