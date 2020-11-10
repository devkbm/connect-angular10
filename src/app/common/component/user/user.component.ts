import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { UserGridComponent } from './user-grid.component';
import { UserFormComponent } from './user-form.component';
import { AppBase } from '../../app/app-base';
import { UserService } from '../../service/user.service';
import { ResponseList } from '../../model/response-list';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent extends AppBase implements OnInit {

  drawerVisible = false;

  queryKey = 'userId';
  queryValue = '';

  @ViewChild('userGrid', {static: false})
  grid: UserGridComponent;

  @ViewChild('userForm', {static: false})
  form: UserFormComponent;

  constructor(location: Location,private userService: UserService) { 
    super(location); 
  }

  ngOnInit() {
  }

  closeDrawer() {
    this.drawerVisible = false;
  }

  openDrawer() {
    this.drawerVisible = true;
  }

  editDrawOpen(item) {
    this.form.getUser(item.userId);
    this.openDrawer();
  }

  getUserList() {
    let params = null;
    if ( this.queryValue !== '') {
      params = new Object();
      params[this.queryKey] = this.queryValue;
    }

    this.closeDrawer();
    this.grid.getUserList(params);
  }

  saveUser() {
    this.form.registerUser();
  }

  deleteUser() {    
    this.form.deleteUser(this.grid.getSelectedRow().userId);
  }

  initForm() {
    this.form.newForm();
    this.openDrawer();
  }    

  test() {
    window.location.href = 'http://localhost:8090/oauth2/authorization/google';
  }
}
