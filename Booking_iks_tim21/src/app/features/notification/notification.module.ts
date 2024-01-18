import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationViewComponent } from './notification-view/notification-view.component';
import { NotificationPageComponent } from './notification-page/notification-page.component';
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";



@NgModule({
  declarations: [
    NotificationViewComponent,
    NotificationPageComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule
  ]
})
export class NotificationModule { }
