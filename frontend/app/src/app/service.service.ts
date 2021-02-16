import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  // LOGIN
  login(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/login`, data);
  }
  
  getStudent(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/getStudent`, data);
  }
  
  getEmployee(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/getEmployee`, data);
  }

  // REGISTER
  registerStudent(username, password, index, type, firstName, lastName, status) {
    const data = {
      username: username,
      password: password,
      index: index,
      type: type,
      firstName: firstName,
      lastName: lastName,
      status: status,
    }
    return this.http.post(`${this.uri}/registerStudent`, data);
  }

  registerEmployee(username, password, firstName, lastName, address, phoneNumber, title, room, status, webpage, type, personalInfo) {
    const data = {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      address: address,
      phoneNumber: phoneNumber,
      title: title,
      room: room,
      status: status,
      webpage: webpage,
      type: type,
      personalInfo: personalInfo
    }
    return this.http.post(`${this.uri}/registerEmployee`, data);
  }

  // RESET PASSWORD
  resetPassword(username, password) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/resetPassword`, data);
  }

  // GET EMPLOYEES
  getAllEmployees() {
    return this.http.get(`${this.uri}/getAllEmployees`);
  }

  // GET ALL USERS
  getAllUsers() {
    return this.http.get(`${this.uri}/getAllUsers`);
  }

  // DELETE USER
  deleteUser(username, type) {
    const data = {
      username: username,
      type: type
    }
    return this.http.post(`${this.uri}/deleteUser`, data);
  }

  // NOTIFICATIONS
  getAllNotifications() {
    return this.http.get(`${this.uri}/getAllNotifications`);
  }

  // UPDATE EMPLOYEE
  updateEmployee(username, address, phoneNumber, personalInfo, room) {
    const data = {
      username: username,
      address: address,
      phoneNumber: phoneNumber,
      personalInfo: personalInfo,
      room: room
    }
    return this.http.post(`${this.uri}/updateEmployee`, data);
  }

  // POST IMAGE
  public postImage(formData: FormData){
    alert("Service post image");
    return this.http.post(`${this.uri}/register/uploadFile`, formData);
  }

}