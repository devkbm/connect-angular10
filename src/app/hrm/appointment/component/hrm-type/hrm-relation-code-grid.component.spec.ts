/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HrmRelationCodeGridComponent } from './hrm-relation-code-grid.component';

describe('HrmRelationCodeGridComponent', () => {
  let component: HrmRelationCodeGridComponent;
  let fixture: ComponentFixture<HrmRelationCodeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrmRelationCodeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmRelationCodeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
