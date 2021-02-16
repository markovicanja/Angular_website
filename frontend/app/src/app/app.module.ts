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
import { MasterComponent } from './master/master.component';
import { ResearchComponent } from './research/research.component';
import { NotificationComponent } from './notification/notification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ProfileEmployeeComponent } from './profile-employee/profile-employee.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { ProfileComponent } from './profile/profile.component';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employee/employee.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    MasterComponent,
    ResearchComponent,
    NotificationComponent,
    ResetPasswordComponent,
    ProfileStudentComponent,
    ProfileEmployeeComponent,
    ProfileAdminComponent,
    ProfileComponent,
    EmployeesComponent,
    EmployeeComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
