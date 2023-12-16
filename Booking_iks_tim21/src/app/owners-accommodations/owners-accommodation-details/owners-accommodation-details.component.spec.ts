import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersAccommodationDetailsComponent } from './owners-accommodation-details.component';

describe('OwnersAccommodationDetailsComponent', () => {
  let component: OwnersAccommodationDetailsComponent;
  let fixture: ComponentFixture<OwnersAccommodationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnersAccommodationDetailsComponent]
    });
    fixture = TestBed.createComponent(OwnersAccommodationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
