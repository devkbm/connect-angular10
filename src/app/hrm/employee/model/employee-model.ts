/*
import { DeptChangeHistory } from './dept-change-history';
import { JobChangeHistory } from './job-change-history';
import { StatusChangeHistory } from './status-change-history';
*/

export class EmployeeModel {
  id: string;
  name: string;
  nameEng: string;
	nameChi: string;
  residentRegistrationNumber: string;
  gender: string;
  birthday: Date;
  workCondition: string;
  imagePath: string;
  deptHistory: any; // DeptChangeHistory[];
	jobHistory: any; // JobChangeHistory[];
	statusHistory: any; // StatusChangeHistory[];
	deptChangeHistory: any;// DeptChangeHistory[];
	jobChangeHistory: any; //JobChangeHistory[];
	statusChangeHistory: any; //StatusChangeHistory[];
}
