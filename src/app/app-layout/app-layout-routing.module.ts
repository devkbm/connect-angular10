import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppLayoutComponent } from './app-layout.component';

import { AuthorityComponent } from '../common/component/authority/authority.component';
import { UserComponent } from '../common/component/user/user.component';
import { ProgramComponent } from '../common/component/program/program.component';
import { MenuComponent } from '../common/component/menu/menu.component';
import { TermComponent } from '../common/component/terms/term.component';
import { CommonCodeComponent } from '../common/component/commoncode/common-code.component';
import { DeptComponent } from '../common/component/dept/dept.component';
import { HolidayComponent } from '../common/component/holiday/holiday.component';

import { TeamComponent } from '../cooperation/communication/component/team.component';
import { BoardComponent } from '../cooperation/board/component/board.component';
import { SurveyFormComponent } from '../cooperation/survey/component/survey-form.component';
import { WorkgroupComponent } from '../cooperation/workgroup/component/workgroup/workgroup.component';

const layoutroutes: Routes = [
  {
    path: 'home', component: AppLayoutComponent,
    children: [
      /* 공통 시스템 */
      {path: 'user',          component: UserComponent},
      {path: 'auth',          component: AuthorityComponent},
      {path: 'program',       component: ProgramComponent},
      {path: 'menu',          component: MenuComponent},
      {path: 'commoncode',    component: CommonCodeComponent},
      {path: 'dept',          component: DeptComponent},
      {path: 'term',          component: TermComponent},
      {path: 'holiday',       component: HolidayComponent},
      /* 협업시스템 */
      {path: 'team',          component: TeamComponent},
      {path: 'board',         component: BoardComponent},
      {path: 'workgroup',     component: WorkgroupComponent},
      {path: 'surveyform',      component: SurveyFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(layoutroutes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
