
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { AppAlarmService } from 'src/app/common/service/app-alarm.service';

import { AggridFunction } from 'src/app/common/grid/aggrid-function';
import { ResponseList } from 'src/app/common/model/response-list';
import { PayItemService } from '../../service/pay-item.service';
import { PayItem } from '../../model/pay-item';

@Component({
  selector: 'app-pay-item-grid',
  templateUrl: './pay-item-grid.component.html',
  styleUrls: ['./pay-item-grid.component.css']
})
export class PayItemGridComponent extends AggridFunction implements OnInit {

  gridList: PayItem[];

  @Input()
  appointmentCode;

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private appAlarmService: AppAlarmService,
              private payitemService: PayItemService) {
      super();

      this.columnDefs = [
        {
          headerName: '',
          width: 34,
          cellStyle: {'text-align': 'center', 'padding': '0px'},
          cellRenderer: 'buttonRenderer',
          cellRendererParams: {
            onClick: this.onEditButtonClick.bind(this),
            label: '',
            iconType: 'form'
          }
        },
        {
          headerName: 'No',
          valueGetter: 'node.rowIndex + 1',
          width: 70,
          cellStyle: {'text-align': 'center'}
        },
        { headerName: '급여항목코드',     field: 'code',        width: 200 },
        { headerName: '급여항목명', field: 'codeName',  width: 200 },
        { headerName: '구분',         field: 'type',        width: 150, editable: true},
        { headerName: '순번',         field: 'seq',          width: 80 },
        { headerName: '비고',         field: 'comment',          width: 80 }
      ];

      this.defaultColDef = {
        sortable: true,
        resizable: true
      };

      this.getRowNodeId = (data) => {
          return data.code;
      };
  }

  ngOnInit() {
  }

  public click(params) {
    this.getGridList("A01");

    console.log(this.gridList);
  }

  private onEditButtonClick(e) {
    this.editButtonClicked.emit(e.rowData);
  }

  getGridList(appointmentCode: string): void {
    const params = {

    };

    this.payitemService
        .getPayItemList(params)
        .subscribe(
          (model: ResponseList<PayItem>) => {
              if (model.total > 0) {
                  this.gridList = model.data;
              } else {
                  this.gridList = null;
              }
              this.appAlarmService.changeMessage(model.message);
          },
          (err) => {
              console.log(err);
          },
          () => {}
        );

  }

  selectionChanged(event): void {
    const selectedRows = this.gridApi.getSelectedRows();

    this.rowSelected.emit(selectedRows[0]);
  }

  rowDbClicked(event): void {
    this.rowDoubleClicked.emit(event.data);
  }

}
