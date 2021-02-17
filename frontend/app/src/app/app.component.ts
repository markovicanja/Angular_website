import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    if (localStorage.getItem("user") == "")
      this.sessionValid = false;
    else this.sessionValid = true;
    if (localStorage.getItem("user") == "zaposlen")
      this.employeeLogged = true;
    else this.employeeLogged = false;
  }    

  sessionValid: boolean;
  employeeLogged: boolean;

  logout() {
    localStorage.setItem("user", "");
    localStorage.setItem("admin", null);
    localStorage.setItem("student", null);
    localStorage.setItem("employee", null);
    this.sessionValid = false;
    this.router.navigate(["home"]);
  }

}
