import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnersAccommodationPreviewComponent } from './owners-accommodation-preview.component';

describe('OwnersAccommodationPreviewComponent', () => {
  let component: OwnersAccommodationPreviewComponent;
  let fixture: ComponentFixture<OwnersAccommodationPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnersAccommodationPreviewComponent]
    });
    fixture = TestBed.createComponent(OwnersAccommodationPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
