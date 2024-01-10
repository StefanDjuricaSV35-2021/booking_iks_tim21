import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResReqFilterBarComponent } from './res-req-filter-bar.component';

describe('ResReqFilterBarComponent', () => {
  let component: ResReqFilterBarComponent;
  let fixture: ComponentFixture<ResReqFilterBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResReqFilterBarComponent]
    });
    fixture = TestBed.createComponent(ResReqFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
