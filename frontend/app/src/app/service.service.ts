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
  
  // GET STUDENT
  getStudent(username) {
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/getStudent`, data);
  }
  
  // GET EMPLOYEE
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

  registerEmployee(username, password, firstName, lastName, address, phoneNumber, title, room, status, webpage, type, personalInfo, profilePicture) {
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
      personalInfo: personalInfo,
      profilePicture: profilePicture
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
  getAllStudents() {
    return this.http.get(`${this.uri}/getAllStudents`);
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

  // ADMIN UPDATE EMPLOYEE
  adminUpdateEmployee(username, address, phoneNumber, personalInfo, room, webpage, title, status) {
    const data = {
      username: username,
      address: address,
      phoneNumber: phoneNumber,
      personalInfo: personalInfo,
      room: room,
      webpage: webpage,
      title: title,
      status: status
    }
    return this.http.post(`${this.uri}/adminUpdateEmployee`, data);
  }

  // ADMIN UPDATE STUDENT 
  adminUpdateStudent(oldUsername, username, index, status, type) {
    const data = {
      oldUsername: oldUsername,
      username: username,
      index: index,
      status: status,
      type: type
    }
    return this.http.post(`${this.uri}/adminUpdateStudent`, data);
  }

  // ADMIN ADD STUDENT SUBJECT
  addStudentSubject(username, subject) {
    const data = {
      username: username,
      subject: subject
    }
    return this.http.post(`${this.uri}/addStudentSubject`, data);
  }

  // GET ALL SUBJECTS
  getAllSubjects() {
    return this.http.get(`${this.uri}/getAllSubjects`);
  }

  // GET SUBJECT
  getSubject(code) {
    const data = {
      code: code
    }
    return this.http.post(`${this.uri}/getSubject`, data);
  }

  // DELETE SUBJECT
  deleteSubject(code) {
    const data = {
      code: code
    }
    return this.http.post(`${this.uri}/deleteSubject`, data);
  }

  // INSERT SUBJECT
  insertSubject(code, title, type, department, semestar, espb, goal, propositions, fondLecture, fondExercise, fondLab, classTime, excerciseTime) {
    const data = {
      code: code,
      title: title,
      type: type,
      department: department,
      semestar: semestar,
      espb: espb,
      goal: goal,
      propositions: propositions,
      fondLecture: fondLecture,
      fondExercise: fondExercise,
      fondLab: fondLab,
      classTime: classTime,
      excerciseTime: excerciseTime
    }
    return this.http.post(`${this.uri}/insertSubject`, data);
  }

  // UPDATE SUBJECT
  updateSubject(code, title, type, department, semestar, espb, goal, propositions, fondLecture, fondExercise, fondLab, classTime, excerciseTime) {
    const data = {
      code: code,
      title: title,
      type: type,
      department: department,
      semestar: semestar,
      espb: espb,
      goal: goal,
      propositions: propositions,
      fondLecture: fondLecture,
      fondExercise: fondExercise,
      fondLab: fondLab,
      classTime: classTime,
      excerciseTime: excerciseTime
    }
    return this.http.post(`${this.uri}/updateSubject`, data);
  }

  // NOTIFICATIONS
  getAllNotifications() {
    return this.http.get(`${this.uri}/getAllNotifications`);
  } 

  // GET ENGAGEMENT PLAN
  getEngagementPlan() {
    return this.http.get(`${this.uri}/getEngagementPlan`);
  }

  // GET SUBJECT ENGAGEMENT PLAN
  getSubjectEngagementPlan(subjectCode) {
    const data = {
      subjectCode: subjectCode
    }
    return this.http.post(`${this.uri}/getSubjectEngagementPlan`, data);
  }

  // DELETE ENGAGEMENT PLAN
  deleteEngagementPlan(subjectCode) {
    const data = {
      subjectCode: subjectCode
    }
    return this.http.post(`${this.uri}/deleteEngagementPlan`, data);
  }

  // INSERT ENGAGEMENT PLAN
  insertEngagementPlan(subjectCode, group, employees) {
    const data = {
      subjectCode: subjectCode, 
      group: group, 
      employees: employees
    }
    return this.http.post(`${this.uri}/insertEngagementPlan`, data);
  }

  // DELETE FILE FROM SUBJECT
  deleteFileSubject(code, material, fileName) {
    const data = {
      code: code, 
      material: material, 
      fileName: fileName
    }
    return this.http.post(`${this.uri}/deleteFileSubject`, data);
  }

  // DELETE FILE FROM NOTIFICATION
  deleteFileNotification(code, index, fileName) {
    const data = {
      code: code, 
      index: index, 
      fileName: fileName
    }
    return this.http.post(`${this.uri}/deleteFileNotification`, data);
  }

  // UPDATE SUBJECT EXAM MATERIALS
  updateExamMaterials(code, examMaterials) {
    const data = {
      code: code, 
      examMaterials: examMaterials
    }
    return this.http.post(`${this.uri}/updateExamMaterials`, data);
  }

  // UPDATE PROJECT MATERIALS
  updateProjectMaterials(code, project) {
    const data = {
      code: code, 
      project: project
    }
    return this.http.post(`${this.uri}/updateProjectMaterials`, data);
  }

  // UPDATE LAB
  updateLabInfo(code, lab) {
    const data = {
      code: code, 
      lab: lab
    }
    return this.http.post(`${this.uri}/updateLabInfo`, data);
  }

  // ADD NEW LAB
  addNewLab(code) {
    const data = {
      code: code,
    }
    return this.http.post(`${this.uri}/addNewLab`, data);
  }
  
  // ADD NEW PROJECT
  addNewProject(code) {
    const data = {
      code: code,
    }
    return this.http.post(`${this.uri}/addNewProject`, data);
  }

  // ADD SUBJECT NOTIFICATION
  addNotification(code, notification) {
    const data = {
      code: code,
      notification: notification,
    }
    return this.http.post(`${this.uri}/addNotification`, data);
  }

  // UPDATE NOTIFICATION
  updateNotificationInfo(subjectCode, index, notification) {
    const data = {
      subjectCode: subjectCode,
      index: index,
      notification: notification
    }
    return this.http.post(`${this.uri}/updateNotificationInfo`, data);
  }

  // DELETE NOTIFICATION
  deleteNotification(subjectCode, title) {
    const data = {
      subjectCode: subjectCode,
      title: title
    }
    return this.http.post(`${this.uri}/deleteNotification`, data);
  }

  // GET ALL LISTS
  getAllLists() {
    return this.http.get(`${this.uri}/getAllLists`);
  }

  // INSERT LIST
  insertList(list) {
    const data = {
      lista: list
    }
    return this.http.post(`${this.uri}/insertList`, data);
  }

  // CLOSE LIST
  closeList(list) {
    const data = {
      lista: list
    }
    return this.http.post(`${this.uri}/closeList`, data);
  }

}