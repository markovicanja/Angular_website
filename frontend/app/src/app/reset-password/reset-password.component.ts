import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.oldPassword = "";
    this.newPassword = "";
    this.repeatedPassword = "";
  }

  user: User;
  oldPassword: string;
  newPassword: string;
  repeatedPassword: string;
  error: string;

  resetPassword() {
    if (this.oldPassword == "" || this.newPassword == "" || this.repeatedPassword == "") {
      this.error = "Morate uneti sva polja";
      return;
    }
    this.user = JSON.parse(localStorage.getItem("loggedUser"));
    if (this.user.password != this.oldPassword) {
      this.error = "Pogresna lozinka";
    }
    else if (this.newPassword != this.repeatedPassword) {
      this.error = "Lozinke se ne poklapaju";
    }
    else {
      this.service.resetPassword(this.user.username, this.newPassword).subscribe(res => {
        localStorage.setItem("user", "");
        localStorage.setItem("admin", null);
        localStorage.setItem("student", null);
        localStorage.setItem("employee", null);
        this.router.navigate(['login']);
      });
    }
  }

}
