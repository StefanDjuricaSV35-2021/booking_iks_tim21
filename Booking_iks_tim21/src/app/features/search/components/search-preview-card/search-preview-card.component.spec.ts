import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPreviewCardComponent } from './search-preview-card.component';

describe('SearchPreviewCardComponent', () => {
  let component: SearchPreviewCardComponent;
  let fixture: ComponentFixture<SearchPreviewCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPreviewCardComponent]
    });
    fixture = TestBed.createComponent(SearchPreviewCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
