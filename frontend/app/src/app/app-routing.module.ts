import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { BachelorStudiesComponent } from './bachelor-studies/bachelor-studies.component';
import { ContactComponent } from './contact/contact.component';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees/employees.component';
import { EngagementPlanComponent } from './engagement-plan/engagement-plan.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MasterStudiesComponent } from './master-studies/master-studies.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResearchComponent } from './research/research.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SubjectComponent } from './subject/subject.component';
import { SubjectsEmployeeComponent } from './subjects-employee/subjects-employee.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'research', component: ResearchComponent },
  { path: 'notifications', component: NotificationComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'employees', component: EmployeesComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'editUser', component: EditUserComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'bachelorStudies', component: BachelorStudiesComponent },
  { path: 'masterStudies', component: MasterStudiesComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'editSubject', component: EditSubjectComponent },
  { path: 'addSubject', component: AddSubjectComponent },
  { path: 'engagementPlan', component: EngagementPlanComponent },
  { path: 'subjectsEmployee', component: SubjectsEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
