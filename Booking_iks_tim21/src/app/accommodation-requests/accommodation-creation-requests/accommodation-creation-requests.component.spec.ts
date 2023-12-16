import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCreationRequestsComponent } from './accommodation-creation-requests.component';

describe('AccommodationCreationRequestsComponent', () => {
  let component: AccommodationCreationRequestsComponent;
  let fixture: ComponentFixture<AccommodationCreationRequestsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationCreationRequestsComponent]
    });
    fixture = TestBed.createComponent(AccommodationCreationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
