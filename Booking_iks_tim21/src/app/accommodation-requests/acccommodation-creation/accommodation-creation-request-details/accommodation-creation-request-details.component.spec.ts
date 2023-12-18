import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCreationRequestDetailsComponent } from './accommodation-creation-request-details.component';

describe('AccommodationCreationRequestDetailsComponent', () => {
  let component: AccommodationCreationRequestDetailsComponent;
  let fixture: ComponentFixture<AccommodationCreationRequestDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationCreationRequestDetailsComponent]
    });
    fixture = TestBed.createComponent(AccommodationCreationRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
