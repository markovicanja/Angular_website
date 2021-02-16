import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { Student } from '../model/student.model';
import { User } from '../model/user.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.oldPassword = "";
    this.newPassword = "";
    this.repeatedPassword = "";
    this.user = JSON.parse(localStorage.getItem("loggedUser"));
    if (localStorage.getItem("user") == 'student') {
      this.student = JSON.parse(localStorage.getItem("student"));
    } 
    else if (localStorage.getItem("user") == 'zaposlen') {
      this.employee = JSON.parse(localStorage.getItem("employee"));
    }
  }

  user: User;
  student: Student;
  employee: Employee;
  oldPassword: string;
  newPassword: string;
  repeatedPassword: string;
  error: string;
  msg: string;

  resetPassword() {
    if (this.oldPassword == "" || this.newPassword == "" || this.repeatedPassword == "") {
      this.error = "Morate uneti sva polja";
      return;
    }
    if (this.user.password != this.oldPassword) {
      this.error = "Pogresna lozinka";
    }
    else if (this.newPassword != this.repeatedPassword) {
      this.error = "Lozinke se ne poklapaju";
    }
    else {
      this.service.resetPassword(this.user.username, this.newPassword).subscribe(res => {
        this.msg = "Uspesno ste promenili lozinku";
      });
    }
  }

  register() {
    // registracija korisnika
  }

  edit() {
    // izmena podataka korisnika
  }
}
