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
    this.selectedTeachersP = [];
    this.selectedTeachersV = [];
    this.selectedSubject = null;
    this.numberGroup = 2;
  }

  engagementPlan: EngagementPlan[];
  employees: Employee[];
  map: string[];
  subjects: Subject[];
  selectedSubject: Subject;
  numberGroup: number;
  selectedTeachersP: Array<Array<Employee>>;
  selectedTeachersV: Array<Array<Employee>>;

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

  }

  fillMap() {
    this.map = [];
    this.service.getAllEmployees().subscribe((employees: Employee[]) => {
      this.employees = employees;
      employees.forEach(e => {
        this.map[e.username] = e.firstName + " " + e.lastName;
      })      
    })
  }

  getAllSubjects() {
    this.service.getAllSubjects().subscribe((s: Subject[]) => {      // NE RADI 
      // s.forEach(sub => { 
      //   let found = false;
      //   this.engagementPlan.forEach(plan => {
      //     if (plan.subject == sub.code) found = true;
      //   })
      //   if (!found) this.subjects.push(sub);
      // })
      this.subjects = s;
    })
  }

}
