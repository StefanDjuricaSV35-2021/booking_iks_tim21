import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationPreviewComponent } from './accommodation-preview.component';

describe('AccommodationPreviewComponent', () => {
  let component: AccommodationPreviewComponent;
  let fixture: ComponentFixture<AccommodationPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationPreviewComponent]
    });
    fixture = TestBed.createComponent(AccommodationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
