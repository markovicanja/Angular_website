import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../file.service';
import { Employee } from '../model/employee.model';
import { EngagementPlan } from '../model/engagementPlan.model';
import { FileModel } from '../model/file.model';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-subjects-employee',
  templateUrl: './subjects-employee.component.html',
  styleUrls: ['./subjects-employee.component.css']
})
export class SubjectsEmployeeComponent implements OnInit {

  public formGroup = this.fb.group({
    file: [null, Validators.required]
  });

  private fileName;

  constructor(private service: ServiceService, private fileService: FileService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.employee = JSON.parse(localStorage.getItem("employee"));
    this.getAllSubjects();
    this.selectedSubject = null;
  }

  employee: Employee;
  message: string;
  subjects: Subject[];
  selectedSubject: Subject;
  newFile: FileModel;
  fileToUpload: File = null;

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

  updateSubject() {
    this.service.updateSubject(this.selectedSubject.code, this.selectedSubject.title, this.selectedSubject.type, this.selectedSubject.department,
      this.selectedSubject.semestar, this.selectedSubject.espb, this.selectedSubject.goal, this.selectedSubject.propositions, this.selectedSubject.fondLecture, 
      this.selectedSubject.fondExercise, this.selectedSubject.fondLab, this.selectedSubject.classTime, this.selectedSubject.excerciseTime).subscribe(res => {
        this.message = "Uspesno ste azurirali predmet";
      })  
  }

  deleteFile(file: FileModel, material: String) {
    this.fileService.remove(file.file);
    this.service.deleteFileSubject(this.selectedSubject.code, material, file.file).subscribe(res => {
      
    });
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

  addFile(material: String) {
    let file = {
      file: this.fileName,
      type: "",
      date: new Date(),
      size: 0,
      employee: this.employee.firstName + " " + this.employee.lastName 
    }
    this.fileService.upload(this.fileName, this.formGroup.get('file').value, file, this.selectedSubject.code, material);
    this.service.getSubject(this.selectedSubject.code).subscribe((s: Subject) => {
      this.selectedSubject = s;
    })
  }

  hideExamMaterials(hide: boolean) {
    this.selectedSubject.examMaterials.hidden = hide;
    this.service.updateExamMaterials(this.selectedSubject.code, this.selectedSubject.examMaterials);
  }

  // FILE LIST COMPONENT
  public fileList$: Observable<string[]> = this.fileService.list();

  public download(fileName: string):  void {
    this.fileService.download(fileName);
  }

}



