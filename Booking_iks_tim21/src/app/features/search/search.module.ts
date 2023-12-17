import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterSidebarComponent } from './components/filter-sidebar/filter-sidebar.component';
import { SearchResultsComponent } from './components/search-results-page/search-results.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatListModule} from "@angular/material/list";
import {FormsModule} from "@angular/forms";
import {SearchBarComponent} from "../../shared/components/search-bar/search-bar.component";
import {SharedModule} from "../../shared/shared.module";
import {SearchPreviewCardComponent} from "./components/search-preview-card/search-preview-card.component";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    FilterSidebarComponent,
    SearchResultsComponent,
    SearchPreviewCardComponent,
  ],
  imports: [
    MatCardModule,
    CommonModule,
    MatCheckboxModule,
    MatListModule,
    FormsModule,
    SharedModule,
    MatButtonModule,
    RouterLink
  ],
  exports:[SearchResultsComponent]
})
export class SearchModule { }
