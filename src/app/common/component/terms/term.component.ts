import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { TermGridComponent } from './term-grid.component';
import { TermFormComponent } from './term-form.component';
import { AppBase } from '../../app/app-base';

@Component({
  selector: 'app-term',
  templateUrl: './term.component.html',
  styleUrls: ['./term.component.css']
})
export class TermComponent extends AppBase implements OnInit {

  drawerVisible = false;

  queryKey: string = 'term';
  queryValue: string = '';

  @ViewChild('termGrid', {static: false})
  grid: TermGridComponent;

  @ViewChild('termForm', {static: false})
  form: TermFormComponent;

  constructor(location: Location) {
    super(location);
  }

  ngOnInit(): void {
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  getTermList(): void {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getTermList(params);
  }

  initForm(): void {
    this.form.fg.reset();
    this.openDrawer();
  }

  saveTerm(): void {
    this.form.submitTerm();
  }

  deleteTerm(): void {
    this.form.deleteTerm();
  }

  selectedItem(item): void {
    this.form.fg.patchValue(item);
  }

  editDrawerOpen(item): void {
    this.form.fg.patchValue(item);
    this.openDrawer();
  }

}
