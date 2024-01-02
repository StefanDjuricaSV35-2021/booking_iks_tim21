import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestsReservationsPageComponent } from './guests-reservations-page.component';

describe('GuestsReservationsPageComponent', () => {
  let component: GuestsReservationsPageComponent;
  let fixture: ComponentFixture<GuestsReservationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestsReservationsPageComponent]
    });
    fixture = TestBed.createComponent(GuestsReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
