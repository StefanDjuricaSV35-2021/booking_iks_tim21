import {Component} from '@angular/core';
import {MatCalendarCellCssClasses, MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule} from '@angular/material/core';
import {AccommodationDetailsDTO} from "./model/AccommodationDetailsDTO";
import {ActivatedRoute} from "@angular/router";
import {AccommodationDetailsService} from "./service/accommodation-details.service";
import {SharedModule} from "../../../../shared/shared.module";
import {MatDialog} from "@angular/material/dialog";
import {MapComponent} from "../map/map.component";

@Component({
  selector: 'app-accommodation-details',
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

  dateClass() {
    return (date: Date,view: string): MatCalendarCellCssClasses => {

      for (const dateRange of this.acc.dates!) {
        let dates=dateRange.split(";")
        let date1=new Date(Number(dates[0])*1000);
        let date2=new Date(Number(dates[1])*1000);

        if(view=='year'){

          date1.setDate(1);
          date2.setDate(1);


          if(date>=date1&&date<=date2){
            return 'highlight';
          }
        }
        else if(view=='multi-year'){
          if(date.getFullYear()>=date1.getFullYear()&&date.getFullYear()<=date2.getFullYear()){
            return 'highlight';
          }

        }else if(view=='month'){
          if(date>=date1&&date<=date2){
            return 'highlight Disabled';
          }
        }

      }

      return 'Disabled';

    };
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
