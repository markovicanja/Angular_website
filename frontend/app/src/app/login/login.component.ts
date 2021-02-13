import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: ServiceService, private ruter: Router) { }

  ngOnInit(): void {
    this.username = "";
    this.password = "";
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
          localStorage.setItem('user', JSON.stringify(user));
          alert("LOGIN")
          // NAVIGATION
          // if (user.type == 'admin') this.ruter.navigate(['/admin']);
          // else this.ruter.navigate(['/kupac']);
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
