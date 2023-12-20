import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmenityFormComponent } from './amenity-form.component';

describe('AmenityFormComponent', () => {
  let component: AmenityFormComponent;
  let fixture: ComponentFixture<AmenityFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmenityFormComponent]
    });
    fixture = TestBed.createComponent(AmenityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
