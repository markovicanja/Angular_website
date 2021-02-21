import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  file: any;
  fileInputLabel: string;
  imgH: number = -1;
  imgW : number = -1;
  public slika: string = null;
  
  constructor(private service: ServiceService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    if (localStorage.getItem("user") == "admin") this.adminLogged = true;
    else this.adminLogged = false;
    
    this.fileUploadForm = this.formBuilder.group({
      uploadedImage: ['']
    });

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

    this.fileInputLabel = "";
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
          else this.router.navigate(["users"]);
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
        this.employeeStatus, this.employeeWebsite, empolyeeType, this.employeeInfo, this.fileInputLabel).subscribe(res => {
          if (!this.adminLogged) this.router.navigate(["login"]);
          else {
            this.router.navigate(["users"]);
          } 
      });
    }
  }

  onFileSelect(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result as string;
      img.onload = () => {
        this.imgH = img.naturalHeight;
        this.imgW = img.naturalWidth;
      };
    };
    this.fileInputLabel = file.name;
    this.fileUploadForm.get('uploadedImage').setValue(file);
  }

}