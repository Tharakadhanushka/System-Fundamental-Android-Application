import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationPopoverPage } from './location-popover.page';

describe('LocationPopoverPage', () => {
  let component: LocationPopoverPage;
  let fixture: ComponentFixture<LocationPopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationPopoverPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationPopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
