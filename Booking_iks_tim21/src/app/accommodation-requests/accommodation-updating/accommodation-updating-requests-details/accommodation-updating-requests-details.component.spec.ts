import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationUpdatingRequestsDetailsComponent } from './accommodation-updating-requests-details.component';

describe('AccommodationUpdatingRequestsDetailsComponent', () => {
  let component: AccommodationUpdatingRequestsDetailsComponent;
  let fixture: ComponentFixture<AccommodationUpdatingRequestsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationUpdatingRequestsDetailsComponent]
    });
    fixture = TestBed.createComponent(AccommodationUpdatingRequestsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
