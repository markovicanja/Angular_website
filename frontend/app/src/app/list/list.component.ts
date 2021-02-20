import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { ListModel } from '../model/list.model';
import { ServiceService } from '../service.service';
import { FileService } from '../file.service';
import { Subject } from '../model/subject.model';
import { EngagementPlan } from '../model/engagementPlan.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private service: ServiceService, private fileService: FileService) { }

  ngOnInit(): void {
    this.employee = JSON.parse(localStorage.getItem("employee"));
    this.getAllLists();
    this.getAllSubjects();
    this.newList = new ListModel();
  }

  employee: Employee;
  lists: ListModel[];
  subjects: Subject[];
  newList: ListModel;

  getAllLists() {
    this.service.getAllLists().subscribe((l: ListModel[]) =>{
      this.lists = l;
    })
  }

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

  download(fileName) {
    this.fileService.download(fileName);
  }

  closeList(list: ListModel) {
    this.service.closeList(list).subscribe(res => {
      this.getAllLists();
    })
  }

  addList() {
    this.service.insertList(this.newList).subscribe(res => {
      this.getAllLists();
    });
  }

}
