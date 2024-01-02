import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersReservationsPageComponent } from './owners-reservations-page.component';

describe('OwnersReservationsPageComponent', () => {
  let component: OwnersReservationsPageComponent;
  let fixture: ComponentFixture<OwnersReservationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnersReservationsPageComponent]
    });
    fixture = TestBed.createComponent(OwnersReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
