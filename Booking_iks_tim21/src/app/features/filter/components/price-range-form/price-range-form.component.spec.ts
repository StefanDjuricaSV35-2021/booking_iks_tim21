import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceRangeFormComponent } from './price-range-form.component';

describe('PriceRangeFormComponent', () => {
  let component: PriceRangeFormComponent;
  let fixture: ComponentFixture<PriceRangeFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PriceRangeFormComponent]
    });
    fixture = TestBed.createComponent(PriceRangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
