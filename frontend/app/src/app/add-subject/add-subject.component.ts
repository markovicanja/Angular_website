import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.subject = new Subject();
    this.subject.type = '';
  }

  subject: Subject;
  classTime: string;
  excerciseTime: string;

  addSubject() {
    this.subject.classTime = this.classTime.split(",");
    this.subject.excerciseTime = this.excerciseTime.split(",");
    this.service.insertSubject(this.subject.code, this.subject.title, this.subject.type, this.subject.department, this.subject.semestar,
      this.subject.espb, this.subject.goal, this.subject.propositions, this.subject.fondLecture, this.subject.fondExercise, 
      this.subject.fondLab, this.subject.classTime, this.subject.excerciseTime).subscribe(res => {
      this.router.navigate(['subjects']);
    })
  }
}
