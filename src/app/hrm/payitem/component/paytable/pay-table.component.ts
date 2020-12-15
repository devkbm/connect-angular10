import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { AppBase } from 'src/app/common/app/app-base';
import { PayTableFormComponent } from './pay-table-form.component';

@Component({
  selector: 'app-pay-table',
  templateUrl: './pay-table.component.html',
  styleUrls: ['./pay-table.component.css']
})
export class PayTableComponent extends AppBase implements OnInit {

  @ViewChild('form', {static: true}) form: PayTableFormComponent;

  drawerVisible = false;

  queryKey = 'dutyCode';
  queryValue = '';

  constructor(location: Location) {
    super(location);
  }

  ngOnInit() {
  }

  openDrawer(): void {
    this.drawerVisible = true;
  }

  closeDrawer(): void {
    this.drawerVisible = false;
  }

}
