import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationUpdatingRequestsPreviewComponent } from './accommodation-updating-requests-preview.component';

describe('AccommodationUpdatingRequestsPreviewComponent', () => {
  let component: AccommodationUpdatingRequestsPreviewComponent;
  let fixture: ComponentFixture<AccommodationUpdatingRequestsPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationUpdatingRequestsPreviewComponent]
    });
    fixture = TestBed.createComponent(AccommodationUpdatingRequestsPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
