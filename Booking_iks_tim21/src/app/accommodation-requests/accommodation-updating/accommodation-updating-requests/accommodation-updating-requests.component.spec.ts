import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationUpdatingRequestsComponent } from './accommodation-updating-requests.component';

describe('AccommodationUpdatingRequestsComponent', () => {
  let component: AccommodationUpdatingRequestsComponent;
  let fixture: ComponentFixture<AccommodationUpdatingRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationUpdatingRequestsComponent],
    });
    fixture = TestBed.createComponent(AccommodationUpdatingRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
