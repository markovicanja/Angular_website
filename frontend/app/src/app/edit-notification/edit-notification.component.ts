import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee.model';
import { EngagementPlan } from '../model/engagementPlan.model';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FileService } from '../file.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SubjectNotification } from '../model/subjectNotification.model';
import { FileModel } from '../model/file.model';

@Component({
  selector: 'app-edit-notification',
  templateUrl: './edit-notification.component.html',
  styleUrls: ['./edit-notification.component.css']
})
export class EditNotificationComponent implements OnInit {

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: "8rem",
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

  constructor(private service: ServiceService, private fileService: FileService, private fb: FormBuilder) { }

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  ngOnInit(): void {
    this.employee = JSON.parse(localStorage.getItem("employee"));
    this.getAllNotifications();
  }

  employee: Employee;
  message: string;
  notifications: SubjectNotification[];
  fileName: string;
  subjects: Subject[];

  getAllNotifications() {
    let subjectStrings = [];
    this.subjects = [];
    this.notifications = [];
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
          subject.notifications.forEach(n => {
            this.notifications.push(n);
            this.subjects.push(subject);
          })          
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

  deleteFile(subject: Subject, index, file: FileModel) {
    this.fileService.remove(file.file);
    this.service.deleteFileNotification(subject.code, index, file.file).subscribe(res => {
      this.getAllNotifications();
    });
  }

  addFile(subject: Subject, index) {
    let file = {
      file: this.fileName,
      type: "",
      date: new Date(),
      size: 0,
      employee: this.employee.firstName + " " + this.employee.lastName 
    }
    this.fileService.uploadNotificationFiles(this.fileName, this.formGroup.get('file').value, file, subject.code, index).subscribe((file: FileModel) => {
      this.getAllNotifications();
    });    
  }

  edit(subject: Subject, index: number, notification: SubjectNotification) {
    this.service.updateNotificationInfo(subject.code, index, notification).subscribe(res => {
      this.getAllNotifications();
    })
  }

  delete(subject: Subject, notification: SubjectNotification) {
    this.service.deleteNotification(subject.code, notification.title).subscribe(res => {
      this.getAllNotifications();
    })
  }

}
