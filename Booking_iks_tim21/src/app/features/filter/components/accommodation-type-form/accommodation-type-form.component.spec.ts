import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationTypeFormComponent } from './accommodation-type-form.component';

describe('AccommodationTypeFormComponent', () => {
  let component: AccommodationTypeFormComponent;
  let fixture: ComponentFixture<AccommodationTypeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationTypeFormComponent]
    });
    fixture = TestBed.createComponent(AccommodationTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
