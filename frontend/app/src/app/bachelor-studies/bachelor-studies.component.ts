import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-bachelor-studies',
  templateUrl: './bachelor-studies.component.html',
  styleUrls: ['./bachelor-studies.component.css']
})
export class BachelorStudiesComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.subjectsRTI = [];
    this.subjectsSI = [];
    this.subjectsRest = [];
    this.getAllSubjects();
  }

  subjectsRTI: Subject[];
  subjectsSI: Subject[];
  subjectsRest: Subject[];

  getAllSubjects() {
    this.service.getAllSubjects().subscribe((subjects: Subject[]) => {
      subjects.sort(function (a, b) {
        return a.semestar - b.semestar;
      });
      subjects.forEach(s => {
        if (s.department == 'rti') this.subjectsRTI.push(s);
        else if (s.department == 'si') this.subjectsSI.push(s);
        else if (s.department == 'ostali') this.subjectsRest.push(s);
      })
    })
  }

  openSubject(s) {
    if (localStorage.getItem("user") == "") return;
    localStorage.setItem("chosenSubject", JSON.stringify(s));
    this.router.navigate(['subject']);
  }

}
