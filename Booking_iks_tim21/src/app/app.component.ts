import {Component, HostListener, OnDestroy} from '@angular/core';
import {NotificationService} from "./core/services/notification/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Booking_iks_tim21';

  constructor(private notifService:NotificationService) {

    notifService.initialize();

  }


}
