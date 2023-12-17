import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCreationRequestPreviewComponent } from './accommodation-creation-request-preview.component';

describe('AccommodationCreationRequestPreviewComponent', () => {
  let component: AccommodationCreationRequestPreviewComponent;
  let fixture: ComponentFixture<AccommodationCreationRequestPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationCreationRequestPreviewComponent]
    });
    fixture = TestBed.createComponent(AccommodationCreationRequestPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
