import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormBase, FormType } from '../../form/form-base';
import { AppAlarmService } from '../../service/app-alarm.service';
import { HolidayService } from '../../service/holiday.service';
import { ResponseObject } from '../../model/response-object';
import { Holiday } from './../../model/holiday';


@Component({
  selector: 'app-holiday-form',
  templateUrl: './holiday-form.component.html',
  styleUrls: ['./holiday-form.component.css']
})
export class HolidayFormComponent extends FormBase implements OnInit {

  fg: FormGroup;

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formLabelSm = 4;

  formControlXs = 24;
  formControlSm = 20;

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private holidayService: HolidayService,
              private appAlarmService: AppAlarmService,
              private datePipe: DatePipe) { super(); }

  ngOnInit(): void {
    this.fg = this.fb.group({
      date          : [ null ],
      holidayName   : [ null ],
      comment       : [ null ]
    });

    this.newForm();
  }

  public newForm(): void {
    this.formType = FormType.NEW;

    this.fg.reset();
  }

  public modifyForm(formData: Holiday): void {
    this.formType = FormType.MODIFY;

    this.fg.patchValue(formData);
  }

  public getEntity(id: string): void {
    this.holidayService
        .getHoliday(id)
        .subscribe(
            (model: ResponseObject<Holiday>) => {
              if ( model.total > 0 ) {
                this.modifyForm(model.data);
              } else {
                this.newForm();
              }
              this.appAlarmService.changeMessage(model.message);
            },
            (err) => {
              console.log(err);
            },
            () => {}
        );
  }

  public submitEntity(): void {
    this.holidayService
        .saveHoliday(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<Holiday>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  public deleteEntity(): void {
    const id = this.datePipe.transform(this.fg.get('date').value, 'yyyyMMdd');

    this.holidayService
        .deleteHoliday(id)
        .subscribe(
            (model: ResponseObject<Holiday>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );
  }

  public closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
