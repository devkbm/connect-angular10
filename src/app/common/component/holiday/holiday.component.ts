import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { AppBase } from '../../app/app-base';
import { HolidayGridComponent } from './holiday-grid.component';
import { HolidayFormComponent } from './holiday-form.component';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.css']
})
export class HolidayComponent extends AppBase implements OnInit {

  @ViewChild('holidayGrid', {static: false})
  grid: HolidayGridComponent;

  @ViewChild('holidayForm', {static: false})
  form: HolidayFormComponent;

  drawerVisible = false;

  queryKey = 'resourceCode';
  queryValue = '';

  selectedRow;

  constructor(location: Location, private datePipe: DatePipe) {
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

  getHolidayList(): void {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getGridList();
  }

  initForm(): void {
    this.form.newForm(this.selectedRow.date);
    this.openDrawer();
  }

  saveProgram(): void {
    this.form.submitEntity();
  }

  deleteProgram(): void {
    this.form.deleteEntity();
  }

  selectedItem(item): void {
    this.selectedRow = item;
  }

  editDrawerOpen(item): void {
    const date: Date = item.date;
    this.form.getEntity(this.datePipe.transform(date, 'yyyyMMdd'));
    this.openDrawer();
  }
}
