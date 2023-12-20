import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeReservationBarComponent } from './make-reservation-bar.component';

describe('MakeReservationBarComponent', () => {
  let component: MakeReservationBarComponent;
  let fixture: ComponentFixture<MakeReservationBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MakeReservationBarComponent]
    });
    fixture = TestBed.createComponent(MakeReservationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
