import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavbarComponent} from "../layout/navbar/navbar.component";
import {FooterComponent} from "../layout/footer/footer.component";
import {SignupComponent} from "../layout/signup/signup.component";
import {SearchBarComponent} from "./components/search-bar/search-bar.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [SearchBarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    RouterLink
  ],
  exports:[SearchBarComponent]
})
export class SharedModule { }
