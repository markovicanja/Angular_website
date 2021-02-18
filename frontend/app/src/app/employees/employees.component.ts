import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { EngagementPlan } from '../model/engagementPlan.model';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllEmpolyees();
    this.subjectsAll = [];
  }

  employees: Employee[];
  subjectsAll: Array<Array<string>>; // za svakog zaposlenog popuni niz njegovih predmeta

  getAllEmpolyees() {
    this.service.getAllEmployees().subscribe((e: Employee[]) => {
      this.employees = e;

      this.employees.forEach(employee => {
        let subjects = [];
        this.service.getEngagementPlan().subscribe((plan: EngagementPlan[]) => {
          plan.forEach(p => {
            p.employees.forEach(e => {
              if (e == employee.username) 
                subjects.push(p.subject);
            });
          });
        });
        this.subjectsAll.push(subjects); 
      });
    });
  }

  open(employee) {
    localStorage.setItem("chosenEmployee", JSON.stringify(employee));
    this.router.navigate(['employee']);
  }

}
