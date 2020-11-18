import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';
import { HrmType } from '../model/hrm-type';
import { HrmTypeDetailCode } from '../model/hrm-type-detail-code';
import { HrmRelationCode } from '../model/hrm-relation-code';

@Injectable({
  providedIn: 'root'
})
export class HrmCodeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getHrmTypeList(params: any): Observable<ResponseList<HrmType>> {
    const url = `${this.API_URL}/hrmtype`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<HrmType>>(url, options).pipe(
      catchError(this.handleError<ResponseList<HrmType>>('getHrmTypeList', null))
    );
  }

  getVaildHrmType(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URL}/hrmtype/${id}/valid`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<boolean>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<boolean>>('getVaildHrmType', null))
    );
  }

  getHrmType(id: string): Observable<ResponseObject<HrmType>> {
    const url = `${this.API_URL}/hrmtype/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<HrmType>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<HrmType>>('getHrmType', null))
    );
  }


  saveHrmType(dept: HrmType): Observable<ResponseObject<HrmType>> {
    const url = `${this.API_URL}/hrmtype`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<HrmType>>(url, dept, options).pipe(
      catchError(this.handleError<ResponseObject<HrmType>>('saveHrmType', null))
    );
  }

  deleteHrmType(id: string): Observable<ResponseObject<HrmType>> {
    const url = `${this.API_URL}/hrmtype/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<HrmType>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<HrmType>>('deleteHrmType', null))
              );
  }

  getHrmTypeDetailCodeList(params: any): Observable<ResponseList<HrmTypeDetailCode>> {
    const url = `${this.API_URL}/typedetailcode`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<HrmTypeDetailCode>>(url, options).pipe(
      catchError(this.handleError<ResponseList<HrmTypeDetailCode>>('getHrmTypeDetailCodeList', null))
    );
  }

  getValidHrmTypeDetailCode(id: string): Observable<ResponseObject<boolean>> {
    const url = `${this.API_URL}/typedetailcode/${id}/valid`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<boolean>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<boolean>>('getValidHrmTypeDetailCode', null))
    );
  }

  getHrmTypeDetailCode(id: string): Observable<ResponseObject<HrmTypeDetailCode>> {
    const url = `${this.API_URL}/typedetailcode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<HrmTypeDetailCode>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<HrmTypeDetailCode>>('getHrmTypeDetailCode', null))
    );
  }


  saveHrmTypeDetailCode(dept: HrmType): Observable<ResponseObject<HrmTypeDetailCode>> {
    const url = `${this.API_URL}/typedetailcode`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<HrmTypeDetailCode>>(url, dept, options).pipe(
      catchError(this.handleError<ResponseObject<HrmTypeDetailCode>>('saveHrmTypeDetailCode', null))
    );
  }

  deleteHrmTypeDetailCode(id: string): Observable<ResponseObject<HrmTypeDetailCode>> {
    const url = `${this.API_URL}/typedetailcode/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<HrmTypeDetailCode>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<HrmTypeDetailCode>>('deleteHrmTypeDetailCode', null))
              );
  }

  getHrmRelationCodeList(params: any): Observable<ResponseList<HrmRelationCode>> {
    const url = `${this.API_URL}/hrmrelation`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: params
    };

    return this.http.get<ResponseList<HrmRelationCode>>(url, options).pipe(
      catchError(this.handleError<ResponseList<HrmRelationCode>>('getHrmRelationCodeList', null))
    );
  }

  getHrmRelationCode(id: string): Observable<ResponseObject<HrmRelationCode>> {
    const url = `${this.API_URL}/hrmrelation/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<HrmRelationCode>>(url, options).pipe(
      catchError(this.handleError<ResponseObject<HrmRelationCode>>('getHrmRelationCode', null))
    );
  }

  saveHrmRelationCode(code: HrmRelationCode): Observable<ResponseObject<HrmRelationCode>> {
    const url = `${this.API_URL}/hrmrelation`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<HrmRelationCode>>(url, code, options).pipe(
      catchError(this.handleError<ResponseObject<HrmRelationCode>>('saveHrmRelationCode', null))
    );
  }

  deleteHrmRelationCode(id: string): Observable<ResponseObject<HrmRelationCode>> {
    const url = `${this.API_URL}/hrmrelation/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<HrmRelationCode>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<HrmRelationCode>>('deleteHrmRelationCode', null))
              );
  }

}
