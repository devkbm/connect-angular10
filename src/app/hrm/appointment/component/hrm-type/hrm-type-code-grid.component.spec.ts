/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrmTypeCodeGridComponent } from './hrm-type-code-grid.component';

describe('HrmTypeCodeGridComponent', () => {
  let component: HrmTypeCodeGridComponent;
  let fixture: ComponentFixture<HrmTypeCodeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrmTypeCodeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmTypeCodeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
