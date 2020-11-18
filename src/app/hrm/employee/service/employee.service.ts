import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';


import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';

import { DataService } from '../../../common/service/data.service';
import { ResponseObject } from '../../../common/model/response-object';
import { ResponseList } from '../../../common/model/response-list';
import { EmployeeModel } from '../model/employee-model';
import { NewEmployee } from '../model/new-employee';
import { SearchEmployee } from '../model/search-employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService extends DataService {

  constructor(http: HttpClient, tokenExtractor: HttpXsrfTokenExtractor) {
    super('/hrm', http, tokenExtractor);
  }

  getAppointmentCodeList(params?: any): Observable<ResponseList<EmployeeModel>> {
    const url = `${this.API_URL}/employee`;
    const options = {
        headers: this.getAuthorizedHttpHeaders(),
        withCredentials: true,
        params: params
     };

    return this.http.get<ResponseList<EmployeeModel>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getEmployeeList(params: SearchEmployee): Observable<ResponseList<EmployeeModel>> {
    const url = `${this.API_URL}/employee`;
    const obj:any = params;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true,
      params: obj
    };

    return this.http.get<ResponseList<EmployeeModel>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  getEmployee(id: string): Observable<ResponseObject<EmployeeModel>> {
    const url = `${this.API_URL}/employee/${id}`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };

    return this.http.get<ResponseObject<EmployeeModel>>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  saveEmployee(obj: EmployeeModel): Observable<ResponseObject<EmployeeModel>> {
    const url = `${this.API_URL}/employee`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<EmployeeModel>>(url, obj, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  createEmployee(obj: NewEmployee): Observable<ResponseObject<EmployeeModel>> {
    const url = `${this.API_URL}/employee/create`;
    const options = {
      headers: this.getAuthorizedHttpHeaders(),
      withCredentials: true
    };
    return this.http.post<ResponseObject<EmployeeModel>>(url, obj, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

  downloadEmployeeImage(employeeId: string): Observable<Blob> {
    const url = `${this.API_URL}/employee/downloadimage`;
    const obj:any = {employeeId: employeeId};

    const options = {
      headers: new HttpHeaders().set('X-Auth-Token', sessionStorage.getItem('token')),
      responseType: 'blob' as 'json',
      withCredentials: true,
      params: obj
    };

    return this.http.get<Blob>(url, options).pipe(
      catchError((err) => Observable.throw(err))
    );
  }

}
