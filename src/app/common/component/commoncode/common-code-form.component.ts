import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { CommonCodeService } from '../../service/common-code.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseObject } from '../../model/response-object';
import { CommonCode } from '../../model/common-code';
import { CommonCodeHierarchy } from '../../model/common-code-hierarchy';
import { ResponseList } from '../../model/response-list';
import { FormBase, FormType } from '../../form/form-base';


@Component({
  selector: 'app-common-code-form',
  templateUrl: './common-code-form.component.html',
  styleUrls: ['./common-code-form.component.css']
})
export class CommonCodeFormComponent extends FormBase implements OnInit {

  fg: FormGroup;
  nodeItems: CommonCodeHierarchy[] = [];
  systemTypeCodeList: CommonCode[];
  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  formControlSm = 24;

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private commonCodeService: CommonCodeService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit(): void {
    this.fg = this.fb.group({
      id                      : [ null ],
      systemTypeCode          : [ null ],
      parentId                : [ null ],
      code                    : [ null, [ Validators.required ] ],
      codeName                : [ null, [ Validators.required ] ],
      codeNameAbbreviation    : [ null ],
      fromDate                : [ null ],
      toDate                  : [ null ],
      seq                     : [ 1    ],
      hierarchyLevel          : [ 1    ],
      fixedLengthYn           : [ null ],
      codeLength              : [ null ],
      cmt                     : [ null ]
    });

    this.newForm(null);

    this.getCommonCodeHierarchy();
    this.getSystemTypeCode();
  }

  newForm(parentId): void {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.get('code').enable();
    this.fg.get('systemTypeCode').enable();
    this.fg.get('parentId').setValue(parentId);
    this.fg.get('fromDate').setValue(new Date());
    this.fg.get('toDate').setValue(new Date(9999, 11, 31));
  }

  modifyForm(formData: CommonCode): void {
    this.formType = FormType.MODIFY;

    this.fg.get('code').disable();
    this.fg.get('systemTypeCode').disable();
    //this.fg.get('parentId').disable();

    this.fg.patchValue(formData);
  }

  getCommonCode(id: string): void {
    this.commonCodeService
        .getCommonCode(id)
        .subscribe(
            (model: ResponseObject<CommonCode>) => {
              if ( model.total > 0 ) {
                this.modifyForm(model.data);
              } else {
                this.newForm(null);
              }
              this.appAlarmService.changeMessage(model.message);
            },
            (err) => {
              console.log(err);
            },
            () => {}
        );
  }

  getCommonCodeHierarchy(): void {
    this.commonCodeService
        .getCommonCodeHierarchy()
        .subscribe(
            (model: ResponseList<CommonCodeHierarchy>) => {
                if ( model.total > 0 ) {
                this.nodeItems = model.data;
                } else {
                this.nodeItems = new Array<CommonCodeHierarchy>(0);
                }
            },
            (err) => {
            console.log(err);
            },
            () => {
            console.log('완료');
            }
        );
  }

  submitCommonCode(): void {
    this.commonCodeService
        .registerCommonCode(this.fg.getRawValue())
        .subscribe(
          (model: ResponseObject<CommonCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formSaved.emit(this.fg.getRawValue());
          },
          (err) => {
            console.log(err);
          },
          () => {}
        );
  }

  deleteCommonCode(): void {
    this.commonCodeService
        .deleteCommonCode(this.fg.get('id').value)
        .subscribe(
            (model: ResponseObject<CommonCode>) => {
            this.appAlarmService.changeMessage(model.message);
            this.formDeleted.emit(this.fg.getRawValue());
            },
            (err) => {
            console.log(err);
            },
            () => {}
        );
  }

  closeForm(): void {
    this.formClosed.emit(this.fg.getRawValue());
  }

  getSystemTypeCode(): void {
    this.commonCodeService
      .getCommonCodeListByParentId('COMSYSTEM')
      .subscribe(
          (model: ResponseList<CommonCode>) => {
            this.systemTypeCodeList = model.data;
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

}
