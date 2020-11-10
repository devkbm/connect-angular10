import { Holiday } from './../model/holiday';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../service/data.service';
import { ResponseObject } from '../model/response-object';
import { ResponseList } from '../model/response-list';

@Injectable({
  providedIn: 'root'
})
export class HolidayService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/common', http, tokenExtractor);
  }

  getHolidayList(fromDate, toDate): Observable<ResponseList<Holiday>> {
    const url = `${this.API_URL}/holiday/${fromDate}/${toDate}`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true
     };

    return this.http.get<ResponseList<Holiday>>(url, options).pipe(
      catchError(this.handleError<ResponseList<Holiday>>('getHolidayList', null))
    );
  }

  getHoliday(id: string): Observable<ResponseObject<Holiday>> {
    const url = `${this.API_URL}/holiday/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .get<ResponseObject<Holiday>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<Holiday>>('getHoliday', null))
              );
  }

  saveHoliday(entity: Holiday): Observable<ResponseObject<Holiday>> {
    const url = `${this.API_URL}/holiday`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http
              .post<ResponseObject<Holiday>>(url, entity, options)
              .pipe(
                catchError(this.handleError<ResponseObject<Holiday>>('saveHoliday', null))
              );
  }

  deleteHoliday(id: string): Observable<ResponseObject<Holiday>> {
    const url = `${this.API_URL}/holiday/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http
              .delete<ResponseObject<Holiday>>(url, options)
              .pipe(
                catchError(this.handleError<ResponseObject<Holiday>>('deleteHoliday', null))
              );
  }

}
