import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("user") == "admin") this.adminLogged = true;
    else this.adminLogged = false;
    
    this.studentName = "";
    this.studentSurname = "";
    this.studentUsername = "";
    this.studentPassword = "";
    this.studentRepeatedPassword = "";
    this.studentIndex = "";
    this.studentStatus = "";
    this.studentType = "";

    this.employeeName = "";
    this.employeeSurname = "";
    this.employeeUsername = "";
    this.employeePassword = "";
    this.employeeRepeatedPassword = "";
    this.employeeAddress = "";
    this.employeePhone = "";
    this.employeeWebsite = "";
    this.employeeInfo = "";
    this.employeeTitle = "";
    this.employeeRoom = "";
    this.employeeStatus = "";
  }

  adminLogged: boolean;
  error: string;

  studentName: string;
  studentSurname: string;
  studentUsername: string;
  studentPassword: string;
  studentRepeatedPassword: string;
  studentIndex: string;
  studentType: string;
  studentStatus: string;

  employeeName: string;
  employeeSurname: string;
  employeeUsername: string;
  employeePassword: string;
  employeeRepeatedPassword: string;
  employeeAddress: string;
  employeePhone: string;
  employeeWebsite: string;
  employeeInfo: string;
  employeeTitle: string;
  employeeRoom: string;
  employeeStatus: string;

  registerStudent() {
    this.error = "";
    if (this.studentName == "" || this.studentSurname == "" || this.studentUsername == "" || this.studentPassword == "" || 
    this.studentRepeatedPassword == "" || this.studentIndex == "" || this.studentType == "" || this.studentStatus == "") {
      this.error = "Morate uneti sva obavezna polja."
    }
    else if (this.studentRepeatedPassword != this.studentPassword) {
      this.error = "Lozinke se ne poklapaju."
    }
    else {
      this.service.registerStudent(this.studentUsername, this.studentPassword, this.studentIndex, this.studentType, 
        this.studentName, this.studentSurname, this.studentStatus).subscribe(res => {
          if (!this.adminLogged) this.router.navigate(["login"]);
          // else this.router.navigate(["registerUsers"]);
      });
    }
  }

  registerEmployee() {
    this.error = "";
    let empolyeeType = "nastavnik";
    if (this.employeeName == "" || this.employeeSurname == "" || this.employeeUsername == "" || this.employeePassword == "" || 
    this.employeeRepeatedPassword == "" || this.employeeAddress == "" || this.employeeTitle == "") {
      this.error = "Morate uneti sva obavezna polja."
    }
    else if (this.employeeRepeatedPassword != this.employeePassword) {
      this.error = "Lozinke se ne poklapaju."
    }
    else {
      if (this.employeeTitle == "istrazivac" || this.employeeTitle == "laboratorijski inzenjer" || this.employeeTitle == "laboratorijski tehnicar") {
        empolyeeType = "laborant";
      }
      if (empolyeeType == "nastavnik" && this.employeeRoom == "") {
        this.error = "Nastavnik mora imati unet broj kabineta.";
        return;
      }
      this.service.registerEmployee(this.employeeUsername, this.employeePassword, this.employeeName, this.employeeSurname, 
        this.employeeAddress,  this.employeePhone, this.employeeTitle, this.employeeRoom,
        this.employeeStatus, this.employeeWebsite, empolyeeType, this.employeeInfo).subscribe(res => {
          if (!this.adminLogged) this.router.navigate(["login"]);
          // else this.router.navigate(["registerUsers"]);
      });
    }
  }

}