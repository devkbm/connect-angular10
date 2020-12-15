import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';
import { PayItem } from '../model/pay-item';
import { PayTable } from '../model/pay-table';

@Injectable({
  providedIn: 'root'
})
export class PayTableService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getPayTableList(params: any): Observable<ResponseList<PayTable>> {
    const url = `${this.API_URL}/paytable`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<PayTable>>(url, options).pipe(
      catchError(this.handleError<ResponseList<PayTable>>('getPayTableList', null))
    );
  }

  /**
   * 급여항목을 조회한다.
   * @param id
   */
  getPayTable(id: string): Observable<ResponseObject<PayTable>> {
    const url = `${this.API_URL}/paytable/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<PayTable>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<PayTable>>('getPayTable', null))
    );
  }

  /**
   * 급여항목을 저장한다.
   * @param payItem 근태신청정보
   */
  savePayTable(payItem: PayItem): Observable<ResponseObject<PayTable>> {
    const url = `${this.API_URL}/paytable`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<PayTable>>(url, payItem, options).pipe(
      catchError(this.handleError<ResponseObject<PayTable>>('savePayTable', null))
    );
  }

  /**
   * 급여항목을 삭제한다.
   * @param id
   */
  deletePayTable(id: string): Observable<ResponseObject<PayTable>> {
    const url = `${this.API_URL}/paytable/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<PayTable>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<PayTable>>('deletePayTable', null))
              );
  }
}
