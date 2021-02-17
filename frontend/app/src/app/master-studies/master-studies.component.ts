import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../model/student.model';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-master-studies',
  templateUrl: './master-studies.component.html',
  styleUrls: ['./master-studies.component.css']
})
export class MasterStudiesComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.subjects = [];
    this.getAllSubjects();
  }

  subjects: Subject[];
  student: Student;

  getAllSubjects() {
    this.service.getAllSubjects().subscribe((subjects: Subject[]) => {
      subjects.sort(function (a, b) {
        return a.semestar - b.semestar;
      });
      subjects.forEach(s => {
        if (s.department == 'master') this.subjects.push(s);
      });      
    })
  }

  openSubject(s: Subject) {
    if (localStorage.getItem("user") == "") return;
    let found = false;
    if (localStorage.getItem("user") == "student") {
      this.student = JSON.parse(localStorage.getItem("student"));
      this.student.subjects.forEach(subject => {
        if (subject == s.code) {
          found = true;
        }
      });
      if (!found) return;
    }
    localStorage.setItem("chosenSubject", JSON.stringify(s));
    this.router.navigate(['subject']);
  }

}
