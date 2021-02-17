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
    this.subject.notifications.sort(function (a, b) {
      var aDate = new Date(a.dateCreation);
      var bDate = new Date(b.dateCreation);
      return bDate.getTime() - aDate.getTime();
    });
  }

  subject: Subject;

  inLastWeek(date) {
    if (date == null) return false;
    var myDate = new Date(date);
    var today = new Date();
    var lastWeek = today.getTime() - (7 * 24 * 60 * 60 * 1000); 
    if (myDate.getTime() < lastWeek) {
      return false;
    }
    return true;
  }

}
