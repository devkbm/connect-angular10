import { PayTableComponent } from './component/paytable/pay-table.component';
import { PayItemGridComponent } from './component/pay-item/pay-item-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonFuncModule } from 'src/app/common/common-func.module';
import { AllNgZorroModule } from 'src/app/all-ng-zorro.module';
import { AgGridModule } from 'ag-grid-angular';

import { ButtonRendererComponent } from 'src/app/common/grid/renderer/button-renderer.component';
import { CheckboxRendererComponent } from 'src/app/common/grid/renderer/checkbox-renderer.component';

import { PayItemFormComponent } from './component/pay-item/pay-item-form.component';
import { PayitemComponent } from './component/pay-item/payitem.component';
import { PayTableFormComponent } from './component/paytable/pay-table-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonFuncModule,
    AllNgZorroModule,
    AgGridModule.withComponents([ButtonRendererComponent, CheckboxRendererComponent])
  ],
  declarations: [
    PayItemFormComponent,
    PayItemGridComponent,
    PayitemComponent,
    PayTableFormComponent,
    PayTableComponent
  ],
  providers: [
  ],
  exports: [
    PayitemComponent,
    PayTableComponent
  ]
})
export class PayitemModule { }
