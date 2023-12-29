import { Component, Input } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { TimeSlot } from '../../../../core/models/timeSlot.model';
import {AppSettings} from "../../../../shared/AppSettings";
import {ReservationDTO} from "../../../../core/models/ReservationDTO";

@Component({
  selector: 'app-availability-calendar',
  templateUrl: './availability-calendar.component.html',
  styleUrls: ['./availability-calendar.component.css'],
})
export class AvailabilityCalendarComponent {
  @Input() dates: TimeSlot[];
  @Input() reservations:ReservationDTO[];

  dateClass() {
    return (date: Date, view: string): MatCalendarCellCssClasses => {



      if (this.dates == undefined) {
        return 'Disabled';
      }
      switch (view) {
        case 'multi-year': {
          return this.getYearView(date);
        }
        case 'year': {
          return this.getMonthView(date);
        }
        case 'month': {
          return this.getDayView(date);
        }
        default: {
          return 'Disabled';
        }
      }
    };

  }


  getYearView(date: Date) {
    for (const ts of this.dates) {
      let dateFrom = new Date(new Date(ts.startDate * AppSettings.unixMultiplier).setHours(0,0,0,0));
      let dateTo = new Date(new Date(ts.endDate * AppSettings.unixMultiplier).setHours(0,0,0,0));
      dateFrom.setMonth(0);
      dateFrom.setDate(0);
      console.log(dateFrom);
      console.log(date);
      console.log(dateTo);

      if (date >= dateFrom && date < dateTo) {

        return 'highlight';
      }
    }

    return 'Disabled';
  }

  getMonthView(date: Date) {
    for (const ts of this.dates) {
      let dateFrom = new Date(new Date(ts.startDate * AppSettings.unixMultiplier).setHours(0,0,0,0));
      let dateTo = new Date(new Date(ts.endDate * AppSettings.unixMultiplier).setHours(0,0,0,0));

      dateFrom.setDate(0);

      console.log(dateFrom);
      console.log(date);
      console.log(dateTo);

      if (date >= dateFrom && date < dateTo) {

        return 'highlight';
      }
    }

    return 'Disabled';
  }

  getDayView(date: Date) {
    for (const ts of this.dates) {

      console.log(date)

      let dateFrom = new Date(new Date(ts.startDate*AppSettings.unixMultiplier).setHours(0,0,0,0));
      let dateTo = new Date(new Date(ts.endDate*AppSettings.unixMultiplier).setHours(0,0,0,0));

      console.log(dateFrom);
      console.log(dateTo);
      console.log("\n")


      if (date >= dateFrom && date < dateTo) {
        return 'highlight Disabled';
      }

    }

    return 'Disabled';
  }
}
