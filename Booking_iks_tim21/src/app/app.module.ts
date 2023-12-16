import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MainPageComponent } from './features/main-page/main-page.component';
import { MatButtonModule } from '@angular/material/button';
import { AccommodationPreviewComponent } from './accommodation-preview/accommodation-preview.component';
import { ProfileModule } from './profile/profile.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor } from './infrastructure/auth/interceptor';
import { OwnersAccommodationsModule } from './owners-accommodations/owners-accommodations.module';
import { SearchBarComponent } from './shared/components/search-bar/search-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { SearchPreviewCardComponent } from './features/search/components/search-preview-card/search-preview-card.component';
import { NgOptimizedImage } from '@angular/common';
import { SearchModule } from './features/search/search.module';
import { FilterSidebarComponent } from './features/search/components/filter-sidebar/filter-sidebar.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    AccommodationDetailsComponent,
    MainPageComponent,
    AccommodationPreviewComponent,
  ],
  imports: [
    SearchModule,
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ProfileModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    OwnersAccommodationsModule,
    MatIconModule,
    NgOptimizedImage,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
