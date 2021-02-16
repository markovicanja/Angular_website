import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MasterComponent } from './master/master.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { ProfileEmployeeComponent } from './profile-employee/profile-employee.component';
import { ProfileStudentComponent } from './profile-student/profile-student.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ResearchComponent } from './research/research.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'master', component: MasterComponent },
  { path: 'research', component: ResearchComponent },
  { path: 'notifications', component: NotificationComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profileStudent', component: ProfileStudentComponent },
  { path: 'profileEmployee', component: ProfileEmployeeComponent },
  { path: 'profileAdmin', component: ProfileAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
