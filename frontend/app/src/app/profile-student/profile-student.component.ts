import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../model/student.model';
import { User } from '../model/user.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-profile-student',
  templateUrl: './profile-student.component.html',
  styleUrls: ['./profile-student.component.css']
})
export class ProfileStudentComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("user") == "") this.router.navigate(["login"]);
    else {
      this.user = JSON.parse(localStorage.getItem("loggedUser"));
      this.student = JSON.parse(localStorage.getItem("student"));
    }
  }

  user: User;
  student: Student;
  error: string;

  update() {
    // UPDATE
  }

}
