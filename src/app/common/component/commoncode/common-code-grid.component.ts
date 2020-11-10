import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CommonCodeService } from '../../service/common-code.service';
import { AppAlarmService } from '../../service/app-alarm.service';

import { ResponseList } from '../../model/response-list';

import { AggridFunction } from '../../grid/aggrid-function';
import { CommonCode } from '../../model/common-code';

@Component({
  selector: 'app-common-code-grid',
  templateUrl: './common-code-grid.component.html',
  styleUrls: ['./common-code-grid.component.css']
})
export class CommonCodeGridComponent extends AggridFunction implements OnInit {

  commonCodeList: CommonCode[];

  @Output()
  rowSelected = new EventEmitter();

  @Output()
  rowDoubleClicked = new EventEmitter();

  @Output()
  editButtonClicked = new EventEmitter();

  constructor(private commonCodeService: CommonCodeService,
              private appAlarmService: AppAlarmService) {

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
      { headerName: 'ID',            field: 'id',                    width: 150 },
      { headerName: '공통코드',      field: 'code',                  width: 200 },
      { headerName: '공통코드명',    field: 'codeName',              width: 200 },
      { headerName: '약어',          field: 'codeNameAbbreviation',  width: 200 },
      {
        headerName: '시작일',
        cellRenderer: (data) => {
          return new Date(data.value).toLocaleString();
        },
        field: 'fromDate',
        width: 200
      },
      {
        headerName: '종료일',
        cellRenderer: (data) => {
          return new Date(data.value).toLocaleString();
        },
        field: 'toDate',
        width: 200
      },
      { headerName: 'Url',           field: 'url',                   width: 200 },
      { headerName: '설명',          field: 'cmt',                   width: 300 }
    ];

    this.getRowNodeId = (data) => {
        return data.id;
    };
  }

  ngOnInit(): void {
    this.getCommonCodeList();
  }

  private onEditButtonClick(e): void {
    this.editButtonClicked.emit(e.rowData);
  }

  public getCommonCodeList(params?: any): void {
    this.commonCodeService
        .getCommonCodeList(params)
        .subscribe(
          (model: ResponseList<CommonCode>) => {
              if (model.total > 0) {
                  this.commonCodeList = model.data;
              } else {
                  this.commonCodeList = null;
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
