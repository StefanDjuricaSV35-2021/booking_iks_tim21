import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCreationComponent } from './accommodation-creation.component';

describe('AccommodationCreatinoComponent', () => {
  let component: AccommodationCreationComponent;
  let fixture: ComponentFixture<AccommodationCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationCreationComponent]
    });
    fixture = TestBed.createComponent(AccommodationCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
