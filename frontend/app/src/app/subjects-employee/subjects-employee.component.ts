import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { EngagementPlan } from '../model/engagementPlan.model';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-subjects-employee',
  templateUrl: './subjects-employee.component.html',
  styleUrls: ['./subjects-employee.component.css']
})
export class SubjectsEmployeeComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.employee = JSON.parse(localStorage.getItem("employee"));
    this.getAllSubjects();
    this.selectedSubject = null;
  }

  employee: Employee;
  message: string;
  subjects: Subject[];
  selectedSubject: Subject;

  getAllSubjects() {
    let subjectStrings = [];
    this.subjects = [];
    this.service.getEngagementPlan().subscribe((plan: EngagementPlan[]) => {
      plan.forEach(p => {
        p.employees.forEach(e => {
          if (e == this.employee.username) {
            subjectStrings.push(p.subject);
            
          }
        })
      })
      subjectStrings.forEach(ss => {
        this.service.getSubject(ss).subscribe((subject: Subject) => {
          this.subjects.push(subject);
        })
      })
    })
  }

  updateSubject() {
    this.service.updateSubject(this.selectedSubject.code, this.selectedSubject.title, this.selectedSubject.type, this.selectedSubject.department,
      this.selectedSubject.semestar, this.selectedSubject.espb, this.selectedSubject.goal, this.selectedSubject.propositions, this.selectedSubject.fondLecture, 
      this.selectedSubject.fondExercise, this.selectedSubject.fondLab, this.selectedSubject.classTime, this.selectedSubject.excerciseTime).subscribe(res => {
        this.message = "Uspesno ste azurirali predmet";
      })  
  }

}
