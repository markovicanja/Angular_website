import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getAllSubjects();
  }

  subjects: Subject[];

  getAllSubjects() {
    this.service.getAllSubjects().subscribe((s: Subject[]) => {
      this.subjects = s;
    })
  }

  editSubject(subject: Subject) {
    localStorage.setItem("editSubject", JSON.stringify(subject));
    this.router.navigate(['editSubject']);
  }

  deleteSubject(subject: Subject) {
    this.service.deleteSubject(subject.code).subscribe(res => {
      this.getAllSubjects();
    }) 
  }

  addSubject() {
    this.router.navigate(["addSubject"]);
  }

}
