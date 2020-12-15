import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/common/app/app-base';
import { PayItemFormComponent } from './pay-item-form.component';
import { PayItemGridComponent } from './pay-item-grid.component';

@Component({
  selector: 'app-payitem',
  templateUrl: './payitem.component.html',
  styleUrls: ['./payitem.component.css']
})
export class PayitemComponent extends AppBase implements OnInit {

  @ViewChild('form', {static: true}) form: PayItemFormComponent;
  @ViewChild('grid', {static: true}) grid: PayItemGridComponent;

  drawerVisible = false;

  queryKey = 'dutyCode';
  queryValue = '';

  optionList = [
    { label: '근무코드', value: 'dutyCode' },
    { label: '급여항목', value: 'code' }
  ];
  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
    this.getPayItemList();
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

  getPayItemList() {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getGridList('');
  }

  initForm() {
    this.form.newForm();
    this.openDrawer();
  }

  savePayItem() {
    this.form.submitForm();
  }

  deletePayItem() {
    const item = this.grid.getSelectedRows()[0];
    console.log(item);
    this.form.deleteForm(item.code);
  }

  selectedItem(item) {
    // this.form.programForm.patchValue(item);
  }

  editDrawerOpen(item) {
    console.log(item);
    this.form.getForm(item.code);
    this.openDrawer();
  }
}
