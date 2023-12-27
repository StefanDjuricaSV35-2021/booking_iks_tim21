import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteAccommodationsPageComponent } from './favorite-accommodations-page.component';

describe('FavoriteAccommodationsPageComponent', () => {
  let component: FavoriteAccommodationsPageComponent;
  let fixture: ComponentFixture<FavoriteAccommodationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteAccommodationsPageComponent]
    });
    fixture = TestBed.createComponent(FavoriteAccommodationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
