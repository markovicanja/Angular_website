import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { Student } from '../model/student.model';
import { User } from '../model/user.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.username = "";
    this.password = "";
    if (localStorage.getItem("user") != "") this.router.navigate(["home"]);
  }

  username: string;
  password: string;
  type: string;
  error: string[];

  login() {
    this.error = [];
    if (this.username == "") this.error.push("Morate uneti korisnicko ime");
    if (this.password == "") this.error.push("Morate uneti lozinku");
    if (this.username == "" || this.password == "") return;
    this.service.login(this.username).subscribe((user: User) => {
      if (user) {
        if (user.password == this.password && user.type == this.type) {
          localStorage.setItem('user', this.type);
          if (user.type == "administrator") {
            localStorage.setItem('admin', JSON.stringify(user));
            window.location.reload();
          }
          else if (user.type == "student") {
            this.service.getStudent(this.username).subscribe((student: Student) => {
              localStorage.setItem('student', JSON.stringify(student));
              window.location.reload();
            })
          }
          else if (user.type == "zaposleni") {
            this.service.getEmployee(this.username).subscribe((employee: Employee) => {
              localStorage.setItem('employee', JSON.stringify(employee));
              window.location.reload();
            })
          }
        }
        else if (user.password == this.password) {
          this.error.push("Pogresan tip");
        }
        else {
          this.error.push("Pogresna lozinka");
        }
      }
      else {
        this.error.push("Korisnik nije u bazi");
      }
    });
  }

}
