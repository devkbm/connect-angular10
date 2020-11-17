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

  ngOnInit(): void {
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  selectedItem(item): void {
    this.form.fg.patchValue(item);
  }

  editDrawOpen(item): void {
    this.form.getAuthority(item.authority);

    this.openDrawer();
  }

  getAuthorityList(): void {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getAuthority(params);
  }

  deleteAuthority(): void {
    this.form.deleteAuthority();
  }

  initForm(): void {
    this.form.newForm();
    this.openDrawer();
  }

}
