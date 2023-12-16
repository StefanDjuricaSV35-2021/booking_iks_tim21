import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeAccommodationComponent } from './change-accommodation.component';

describe('ChangeAccommodationComponent', () => {
  let component: ChangeAccommodationComponent;
  let fixture: ComponentFixture<ChangeAccommodationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeAccommodationComponent]
    });
    fixture = TestBed.createComponent(ChangeAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
