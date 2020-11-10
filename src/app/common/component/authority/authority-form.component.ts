import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';

import { UserService } from '../../service/user.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseObject } from '../../model/response-object';
import { Authority } from '../../model/authority';
import { FormBase, FormType } from '../../form/form-base';
import { existingAuthorityValidator } from '../../validator/authority-duplication-validator.directive';

@Component({
  selector: 'app-authority-form',
  templateUrl: './authority-form.component.html',
  styleUrls: ['./authority-form.component.css']
})
export class AuthorityFormComponent extends FormBase implements OnInit {

  fg: FormGroup;

  /**
   * Xs < 576px span size
   * Sm >= 576px span size
   */
  formLabelXs = 24;
  formControlXs = 24;

  formLabelSm = 24;
  fromControlSm = 24;

  @Output()
  formSaved = new EventEmitter();

  @Output()
  formDeleted = new EventEmitter();

  @Output()
  formClosed = new EventEmitter();

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private appAlarmService: AppAlarmService) { super(); }

  ngOnInit() {
    this.fg = this.fb.group({
      authority     : new FormControl(null, {
                                              validators: Validators.required,
                                              asyncValidators: [existingAuthorityValidator(this.userService)],
                                              updateOn: 'blur'
                                            }),
      description   : [ null ]
    });

    this.newForm();
  }

  public newForm() {
    this.formType = FormType.NEW;

    this.fg.reset();
    this.fg.controls['authority'].enable();
  }

  public modifyForm(formData: Authority) {
    this.formType = FormType.MODIFY;
    
    this.fg.controls['authority'].disable();
    this.fg.patchValue(formData);
  }

  public getAuthority(id: string): void {
    this.userService
      .getAuthority(id)
      .subscribe(
        (model: ResponseObject<Authority>) => {
          if (model.total > 0) {
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

  public saveAuthority(): void {
    this.userService
      .registerAuthority(this.fg.getRawValue())
      .subscribe(
        (model: ResponseObject<Authority>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formSaved.emit(this.fg.getRawValue());
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  public deleteAuthority(): void {
    this.userService
      .deleteAuthority(this.fg.get('authority').value)
      .subscribe(
        (model: ResponseObject<Authority>) => {
          this.appAlarmService.changeMessage(model.message);
          this.formDeleted.emit(this.fg.getRawValue());
        },
        (err) => {
          console.log(err);
        },
        () => {}
      );
  }

  public patchValues(values) {
    this.fg.patchValue(values);
  }

  public closeForm() {
    this.formClosed.emit(this.fg.getRawValue());
  }

}
