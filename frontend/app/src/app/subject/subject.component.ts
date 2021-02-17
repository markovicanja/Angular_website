import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.subject = JSON.parse(localStorage.getItem("chosenSubject"));
  }

  subject: Subject;

}
