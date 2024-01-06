import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerOwnerReviewPageComponent } from './owner-owner-review-page.component';

describe('OwnerOwnerReviewPageComponent', () => {
  let component: OwnerOwnerReviewPageComponent;
  let fixture: ComponentFixture<OwnerOwnerReviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerOwnerReviewPageComponent]
    });
    fixture = TestBed.createComponent(OwnerOwnerReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
