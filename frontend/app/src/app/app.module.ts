import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { ResearchComponent } from './research/research.component';
import { NotificationComponent } from './notification/notification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { BachelorStudiesComponent } from './bachelor-studies/bachelor-studies.component';
import { SubjectComponent } from './subject/subject.component';
import { MasterStudiesComponent } from './master-studies/master-studies.component';
import { SubjectsComponent } from './subjects/subjects.component';
import { EditSubjectComponent } from './edit-subject/edit-subject.component';
import { AddSubjectComponent } from './add-subject/add-subject.component';
import { EngagementPlanComponent } from './engagement-plan/engagement-plan.component';
import { SubjectsEmployeeComponent } from './subjects-employee/subjects-employee.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SubjectNotificationsComponent } from './subject-notifications/subject-notifications.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    ResearchComponent,
    NotificationComponent,
    ResetPasswordComponent,
    ProfileComponent,
    EmployeesComponent,
    EmployeeComponent,
    UsersComponent,
    EditUserComponent,
    BachelorStudiesComponent,
    SubjectComponent,
    MasterStudiesComponent,
    SubjectsComponent,
    EditSubjectComponent,
    AddSubjectComponent,
    EngagementPlanComponent,
    SubjectsEmployeeComponent,
    SubjectNotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
