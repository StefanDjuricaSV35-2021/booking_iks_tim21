import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestOwnerReviewPageComponent } from './guest-owner-review-page.component';

describe('GuestOwnerReviewPageComponent', () => {
  let component: GuestOwnerReviewPageComponent;
  let fixture: ComponentFixture<GuestOwnerReviewPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestOwnerReviewPageComponent]
    });
    fixture = TestBed.createComponent(GuestOwnerReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
