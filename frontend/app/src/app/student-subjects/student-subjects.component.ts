import { Component, OnInit } from '@angular/core';
import { Student } from '../model/student.model';
import { Subject } from '../model/subject.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-student-subjects',
  templateUrl: './student-subjects.component.html',
  styleUrls: ['./student-subjects.component.css']
})
export class StudentSubjectsComponent implements OnInit {

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.getAllSubjects();
    this.getAllStudents();
    this.student = "";
    this.subject = "";
  }

  students: Student[];
  subjects: Subject[];
  student: string;
  subject: string;
  message: string;
  error: string;

  getAllStudents() {
    this.service.getAllStudents().subscribe((s: Student[]) => {
      this.students = s;
    });
  }

  getAllSubjects() {
    this.service.getAllSubjects().subscribe((s: Subject[]) => {
      this.subjects = s;
    })
  }

  add() {
    this.message = "";
    this.error = "";
    if (this.student == "" || this.subject == "") {
      this.error = "Morate uneti sva polja";
    }
    else {
      let found = false;
      this.service.getStudent(this.student).subscribe((s: Student) => {
        s.subjects.forEach(subject => {
          if (this.subject == subject) found = true;
        })
        if (found) this.error = "Student je vec dodat na predmet.";
        else {
          this.service.addStudentSubject(this.student, this.subject).subscribe(res => {
            this.message = "Dodali ste studenta na predmet";
          })
        }
      })
    }
  }
}
