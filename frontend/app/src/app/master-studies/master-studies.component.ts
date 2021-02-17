import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  openSubject(s) {
    localStorage.setItem("chosenSubject", JSON.stringify(s));
    this.router.navigate(['subject']);
  }

}
