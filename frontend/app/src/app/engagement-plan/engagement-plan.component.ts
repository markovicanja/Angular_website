import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { EngagementPlan } from '../model/engagementPlan.model';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-engagement-plan',
  templateUrl: './engagement-plan.component.html',
  styleUrls: ['./engagement-plan.component.css']
})
export class EngagementPlanComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getEngagementPlan();
    this.fillMap();
    this.getAllSubjects();
    this.lectureEmployees = [];
    this.exerciseEmployees = [];
    this.selectedSubject = null;
    if (localStorage.getItem("numberGroup") != null)
      this.numberGroup = Number.parseInt(localStorage.getItem("numberGroup"));
    else this.numberGroup = 1;
  }

  engagementPlan: EngagementPlan[];
  employees: Employee[];
  map: string[];
  subjects: Subject[];
  selectedSubject: Subject;
  numberGroup: number;
  lectureEmployees: Array<Array<Employee>>;
  exerciseEmployees: Array<Array<Employee>>;

  getEngagementPlan() {
    this.service.getEngagementPlan().subscribe((e: EngagementPlan[]) => {
      this.engagementPlan = e;
    })
  }

  deleteEngagementPlan(plan: EngagementPlan) {
    this.service.deleteEngagementPlan(plan.subject).subscribe(res => {
      this.getEngagementPlan();
    })
  }

  insertEngagementPlan() {
    let selectedEmployeesSet = new Set();
    this.lectureEmployees.forEach(array => {
      array.forEach(p => {
        selectedEmployeesSet.add(p);
      })
    })
    this.exerciseEmployees.forEach(array => {
      array.forEach(p => {
        selectedEmployeesSet.add(p);
      })
    })
    let selectedEmployees = Array.from(selectedEmployeesSet);
    let group = [];
    let i = 0;
    this.lectureEmployees.forEach(array => {
      let obj = {
        name: 'P' + (i + 1),
        employees: array
      }
      i++;
      group.push(obj);
    })
    i = 0;
    this.exerciseEmployees.forEach(array => {
      let obj = {
        name: 'V' + (i + 1),
        employees: array
      }
      i++;
      group.push(obj);
    })

    this.service.insertEngagementPlan(this.selectedSubject, group, selectedEmployees).subscribe(res => {
      localStorage.setItem("numberGroup", "1");
      this.ngOnInit();
    })

  }

  fillMap() {
    this.map = [];
    this.employees = [];
    this.service.getAllEmployees().subscribe((employees: Employee[]) => {
      employees.forEach(e => {
        this.map[e.username] = e.firstName + " " + e.lastName;
        if (e.type == 'nastavnik') this.employees.push(e);
      })      
    })
  }

  getAllSubjects() {
    this.service.getAllSubjects().subscribe((s: Subject[]) => {
      this.subjects = s;
    })
  }

  changeNumberOfGroups() {
    localStorage.setItem("numberGroup", ""+this.numberGroup);
    this.ngOnInit();
  }

}
