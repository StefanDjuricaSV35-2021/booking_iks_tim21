import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersAccommodationsPageComponent } from './owners-accommodations-page.component';

describe('OwnersAccommodationsPageComponent', () => {
  let component: OwnersAccommodationsPageComponent;
  let fixture: ComponentFixture<OwnersAccommodationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnersAccommodationsPageComponent]
    });
    fixture = TestBed.createComponent(OwnersAccommodationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
