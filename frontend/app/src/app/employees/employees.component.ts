import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee.model';
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
  }

  employees: Employee[];

  getAllEmpolyees() {
    this.service.getAllEmployees().subscribe((e: Employee[]) => {
      this.employees = e;
    })
  }

  open(employee) {
    localStorage.setItem("chosenEmployee", JSON.stringify(employee));
    this.router.navigate(['employee']);
  }
}
