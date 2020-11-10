import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AuthorityGridComponent } from './authority-grid.component';
import { AuthorityFormComponent } from './authority-form.component';
import { AppBase } from '../../app/app-base';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent extends AppBase implements OnInit {

  drawerVisible = false;

  queryKey = 'authority';
  queryValue = '';

  @ViewChild('authGrid', {static: false})
  grid: AuthorityGridComponent;

  @ViewChild('authForm', {static: false})
  form: AuthorityFormComponent;

  constructor(location: Location) { 
    super(location); 
  }

  ngOnInit() {
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  openDrawer() {
    this.drawerVisible = true;
  }

  selectedItem(item) {
    this.form.fg.patchValue(item);
  }

  editDrawOpen(item) {
    this.form.getAuthority(item.authority);

    this.openDrawer();
  }

  getAuthorityList() {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getAuthority(params);
  }

  deleteAuthority() {
    this.form.deleteAuthority();
  }

  initForm() {
    this.form.newForm();
    this.openDrawer();
  }

}
