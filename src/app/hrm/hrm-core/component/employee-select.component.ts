import { Component, Self, Optional, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { EmployeeCombo } from '../model/employee-combo';
import { ResponseList } from 'src/app/common/model/response-list';
import { HrmCoreService } from '../service/hrm-core.service';

@Component({
  selector: 'app-employee-select',
  templateUrl: './employee-select.component.html',
  styleUrls: ['./employee-select.component.css']
})
export class EmployeeSelectComponent implements ControlValueAccessor, OnChanges, OnInit {

  @Input() disabled: boolean;
  @Input() placeholder = '';

  value: any = '';

  employeeList: EmployeeCombo[];

  constructor(@Self()  @Optional() private ngControl: NgControl,
              private hrmCoreService: HrmCoreService) {
    this.getEmployeeList();

    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  ngOnInit() {
  }

  public getEmployeeList(): void {
    this.hrmCoreService
        .getEmployeeList()
        .subscribe(
          (model: ResponseList<EmployeeCombo>) => {
            console.log(model.data);
            this.employeeList = model.data;
          },
          (err) => {
            console.log(err);
          },
          () => {}
      );
  }

  /**
   * Write form value to the DOM element (model => view)
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Write form disabled state to the DOM element (model => view)
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Update form when DOM element value changes (view => model)
   */
  registerOnChange(fn: any): void {
    // Store the provided function as an internal method.
    this.onChange = fn;
  }

  /**
   * Update form when DOM element is blurred (view => model)
   */
  registerOnTouched(fn: any): void {
    // Store the provided function as an internal method.
    this.onTouched = fn;
  }

  onChange(_: any) {}
  onTouched() {}
}
