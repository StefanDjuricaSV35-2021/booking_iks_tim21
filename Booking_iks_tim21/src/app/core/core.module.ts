import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "./navbar/navbar.component";
import {FooterComponent} from "./footer/footer.component";
import {UserNavbarComponent} from "./navbar/user-navbar/user-navbar.component";
import {LoggedOutNavbarComponent} from "./navbar/logged-out-navbar/logged-out-navbar.component";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../infrastructure/material/material.module";
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";



@NgModule({
  declarations: [ NavbarComponent,
    FooterComponent,
    UserNavbarComponent,
    LoggedOutNavbarComponent,],
  imports: [
  FormsModule,
  CommonModule,
  MaterialModule,
  RouterModule,
  MatToolbarModule,
  MatButtonModule,
  MatMenuModule
  ],
  exports: [NavbarComponent, FooterComponent],

})
export class CoreModule { }
