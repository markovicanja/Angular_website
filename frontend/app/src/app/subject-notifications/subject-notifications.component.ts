import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../model/employee.model';
import { EngagementPlan } from '../model/engagementPlan.model';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { FileModel } from '../model/file.model';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-subject-notifications',
  templateUrl: './subject-notifications.component.html',
  styleUrls: ['./subject-notifications.component.css']
})
export class SubjectNotificationsComponent implements OnInit {

  htmlContent = "";

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    placeholder: "Ovde unesite tekst...",
    translate: "no",
    defaultParagraphSeparator: "p",
    defaultFontName: "Arial",
    sanitize: false,
    toolbarHiddenButtons: [["bold"]],
    customClasses: [
      {
        name: "quote",
        class: "quote"
      },
      {
        name: "redText",
        class: "redText"
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1"
      }
    ]
  };

  constructor(private service: ServiceService, private fileService: FileService, private router: Router, private fb: FormBuilder) { }

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  ngOnInit(): void {
    this.employee = JSON.parse(localStorage.getItem("employee"));
    this.getAllSubjects();
    this.selectedSubject = null;
    this.files = [];
  }

  employee: Employee;
  message: string;
  subjects: Subject[];
  selectedSubject: Subject;
  title: string;
  dateCreation: Date;
  fileName: string;
  files: Array<FileModel>;

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

  addFile() {
    this.message = "";
    let file = {
      file: this.fileName,
      type: "",
      date: new Date(),
      size: 0,
      employee: this.employee.firstName + " " + this.employee.lastName 
    }
    this.fileService.uploadFiles(this.fileName, this.formGroup.get('file').value, file).subscribe((file: FileModel) => {
      this.files.push(file);
      this.message = "Uneli ste fajl";
    });    
  }

  insert() {
    let notification = {
      title: this.title,
      content: this.htmlContent,
      creator: this.employee.firstName + " " + this.employee.lastName,
      dateCreation: this.dateCreation,
      files: this.files
    }
    this.service.addNotification(this.selectedSubject.code, notification).subscribe(res => {
      this.message = "Uneli ste obavestenje";
      this.files = [];
    });
  }

}
