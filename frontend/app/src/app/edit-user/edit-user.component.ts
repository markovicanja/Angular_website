import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { Student } from '../model/student.model';
import { User } from '../model/user.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("editUser"));
    if (this.user.type == 'student') {
      this.service.getStudent(this.user.username).subscribe((s: Student) => {
        this.student = s;
      })
    }
    else if (this.user.type == 'zaposlen') {
      this.service.getEmployee(this.user.username).subscribe((e: Employee) => {
        this.employee = e;
      })
    }
  }

  user: User;
  student: Student;
  employee: Employee;

  updateStudent() {
    this.service.adminUpdateStudent(this.user.username, this.student.username, this.student.index, 
      this.student.status, this.student.type).subscribe(res => {
      this.router.navigate(['users']);
    });
  }

  updateEmployee() {
    this.service.adminUpdateEmployee(this.employee.username, this.employee.address, this.employee.phoneNumber, 
      this.employee.personalInfo, this.employee.room, this.employee.webpage, this.employee.title, this.employee.status).subscribe(res => {
      this.router.navigate(['users']);
    });
  }

}
