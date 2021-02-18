import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.css']
})
export class EditSubjectComponent implements OnInit {
  
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.subject = JSON.parse(localStorage.getItem("editSubject"));
    this.classTime = "";
    this.excerciseTime = "";
    var i = 0;
    this.subject.classTime.forEach(s => {
      if (i > 0) {
        this.classTime += ",";
      }
      this.classTime += s;
      i++;
    });
    i = 0;
    this.subject.excerciseTime.forEach(s => {
      if (i > 0) {
        this.excerciseTime += ",";
      }
      this.excerciseTime += s;
      i++;
    });
  }

  subject: Subject;
  classTime: string;
  excerciseTime: string;

  updateSubject() {
    this.subject.classTime = this.classTime.split(",");
    this.subject.excerciseTime = this.excerciseTime.split(",");
    this.service.updateSubject(this.subject.code, this.subject.title, this.subject.type, this.subject.department, this.subject.semestar,
      this.subject.espb, this.subject.goal, this.subject.propositions, this.subject.fondLecture, this.subject.fondExercise, 
      this.subject.fondLab, this.subject.classTime, this.subject.excerciseTime).subscribe(res => {
      this.router.navigate(['subjects']);
    })
  }
}
