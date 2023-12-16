import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCreatinoComponent } from './accommodation-creatino.component';

describe('AccommodationCreatinoComponent', () => {
  let component: AccommodationCreatinoComponent;
  let fixture: ComponentFixture<AccommodationCreatinoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccommodationCreatinoComponent]
    });
    fixture = TestBed.createComponent(AccommodationCreatinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
