import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../file.service';
import { Employee } from '../model/employee.model';
import { EngagementPlan } from '../model/engagementPlan.model';
import { ListModel } from '../model/list.model';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Student } from '../model/student.model';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  constructor(private service: ServiceService, private router: Router, private fileService: FileService, private fb: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem("user") != "student") this.student = null;
    else {
      this.student = JSON.parse(localStorage.getItem("student"));
    }
    this.subject = JSON.parse(localStorage.getItem("chosenSubject"));
    this.subject.notifications.sort(function (a, b) {
      var aDate = new Date(a.dateCreation);
      var bDate = new Date(b.dateCreation);
      return bDate.getTime() - aDate.getTime();
    });
    this.employees = [];
    this.service.getSubjectEngagementPlan(this.subject.code).subscribe((plan: EngagementPlan) => {
      plan.employees.forEach(e =>{
        this.service.getEmployee(e).subscribe((emp: Employee) => {
          this.employees.push(emp);
        })
      })
    });
    this.getAllLists();
  }

  student: Student;
  subject: Subject;
  employees: Employee[];
  lists: ListModel[];
  fileName: string;

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

  open(employee) {
    localStorage.setItem("chosenEmployee", JSON.stringify(employee));
    this.router.navigate(['employee']);
  }

  download(fileName) {
    this.fileService.download(fileName);
  }

  getAllLists() {
    this.lists = [];
    this.service.getAllLists().subscribe((l: ListModel[]) => {
      l.forEach(list => {
        if(list.subject == this.subject.code) {
          let today = new Date();
          let deadline = new Date(list.deadline);
          if (list.valid == true && deadline > today) this.lists.push(list);
        }
      })
    })
  }

  public onFileChange(event) {
    const reader = new FileReader();  
    if (event.target.files && event.target.files.length) {
      this.fileName = event.target.files[0].name;
      const [file] = event.target.files;
      reader.readAsDataURL(file);
     
      reader.onload = () => {
        this.formGroup.patchValue({
          file: reader.result
        });
      };
    }
  }

  addFile(list: ListModel) {
    let file = {
      student: this.student.username,
      file: this.fileName
    }
    this.fileService.uploadListFiles(this.fileName, this.formGroup.get('file').value, file, list.title).subscribe(res => {})
  }

}
