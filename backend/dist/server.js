"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./model/user"));
const notification_1 = __importDefault(require("./model/notification"));
const student_1 = __importDefault(require("./model/student"));
const employee_1 = __importDefault(require("./model/employee"));
const fs = __importStar(require("fs"));
const subject_1 = __importDefault(require("./model/subject"));
const engagementPlan_1 = __importDefault(require("./model/engagementPlan"));
const list_1 = __importDefault(require("./model/list"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json({ limit: '50mb' }));
mongoose_1.default.connect('mongodb://localhost:27017/RTI_katedra');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log('mongo open');
});
const router = express_1.default.Router();
// LOGIN
router.route('/login').post((req, res) => {
    let username = req.body.username;
    user_1.default.findOne({ 'username': username }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
// GET STUDENT
router.route('/getStudent').post((req, res) => {
    let username = req.body.username;
    student_1.default.findOne({ 'username': username }, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
// GET EMPLOYEE
router.route('/getEmployee').post((req, res) => {
    let username = req.body.username;
    employee_1.default.findOne({ 'username': username }, (err, e) => {
        if (err)
            console.log(err);
        else
            res.json(e);
    });
});
// REGISTER
router.route('/registerStudent').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let index = req.body.index;
    let type = req.body.type;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let status = req.body.status;
    user_1.default.collection.insertOne({ 'username': username, 'password': password, 'type': 'student', 'changedPassword': false });
    student_1.default.collection.insertOne({ 'username': username, 'index': index, 'type': type, 'firstName': firstName,
        'lastName': lastName, 'status': status });
    res.json({ poruka: 1 });
});
router.route('/registerEmployee').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let address = req.body.address;
    let phoneNumber = req.body.phoneNumber;
    let personalInfo = req.body.personalInfo;
    let title = req.body.title;
    let room = req.body.room;
    let status = req.body.status;
    let webpage = req.body.webpage;
    let type = req.body.type;
    let profilePicture = req.body.profilePicture;
    user_1.default.collection.insertOne({ 'username': username, 'password': password, 'type': 'zaposlen', 'changedPassword': false });
    employee_1.default.collection.insertOne({ 'username': username, 'firstName': firstName, 'lastName': lastName, 'address': address,
        'phoneNumber': phoneNumber, 'webpage': webpage, 'personalInfo': personalInfo, 'title': title, 'room': room, 'status': status,
        'type': type, 'profilePicture': profilePicture });
    res.json({ poruka: 1 });
});
// RESET PASSWORD
router.route('/resetPassword').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.collection.updateOne({ 'username': username }, { $set: { "password": password, "changedPassword": true } });
    res.json({ poruka: 1 });
});
// GET EMPLOYEES
router.route('/getAllEmployees').get((req, res) => {
    employee_1.default.find({}, (err, employees) => {
        if (err)
            console.log(err);
        else
            res.json(employees);
    });
});
// GET ALL USERS
router.route('/getAllStudents').get((req, res) => {
    student_1.default.find({}, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
// GET ALL USERS
router.route('/getAllUsers').get((req, res) => {
    user_1.default.find({}, (err, users) => {
        if (err)
            console.log(err);
        else
            res.json(users);
    });
});
// UPDATE EMPLOYEE
router.route('/updateEmployee').post((req, res) => {
    let username = req.body.username;
    let address = req.body.address;
    let phoneNumber = req.body.phoneNumber;
    let personalInfo = req.body.personalInfo;
    let room = req.body.room;
    employee_1.default.collection.updateOne({ 'username': username }, { $set: { "address": address, "phoneNumber": phoneNumber,
            "personalInfo": personalInfo, "room": room } });
    res.json({ poruka: 1 });
});
// ADMIN UPDATE EMPLOYEE
router.route('/adminUpdateEmployee').post((req, res) => {
    let username = req.body.username;
    let address = req.body.address;
    let phoneNumber = req.body.phoneNumber;
    let personalInfo = req.body.personalInfo;
    let room = req.body.room;
    let webpage = req.body.webpage;
    let title = req.body.title;
    let status = req.body.status;
    employee_1.default.collection.updateOne({ 'username': username }, { $set: { "address": address, "phoneNumber": phoneNumber,
            "webpage": webpage, "title": title, "status": status, "personalInfo": personalInfo, "room": room } });
    res.json({ poruka: 1 });
});
// ADMIN UPDATE STUDENT 
router.route('/adminUpdateStudent').post((req, res) => {
    let oldUsername = req.body.oldUsername;
    let username = req.body.username;
    let index = req.body.index;
    let status = req.body.status;
    let type = req.body.type;
    student_1.default.collection.updateOne({ 'username': oldUsername }, { $set: { "index": index, "status": status,
            "type": type, "username": username } });
    user_1.default.collection.updateOne({ 'username': oldUsername }, { $set: { "username": username } });
    res.json({ poruka: 1 });
});
// ADMIN ADD STUDENT SUBJECT
router.route('/addStudentSubject').post((req, res) => {
    let username = req.body.username;
    let subject = req.body.subject;
    student_1.default.collection.updateOne({ 'username': username }, { $push: { "subjects": subject } });
    res.json({ poruka: 1 });
});
// DELETE USER
router.route('/deleteUser').post((req, res) => {
    let username = req.body.username;
    let type = req.body.type;
    user_1.default.collection.deleteOne({ 'username': username }, (err, res) => {
        if (err)
            console.log(err);
        // else console.log("1 document deleted");
    });
    if (type == "student") {
        student_1.default.collection.deleteOne({ 'username': username }, (err, res) => {
            if (err)
                console.log(err);
        });
    }
    else {
        employee_1.default.collection.deleteOne({ 'username': username }, (err, res) => {
            if (err)
                console.log(err);
        });
    }
    res.json({ poruka: 1 });
});
// GET ALL SUBJECTS
router.route('/getAllSubjects').get((req, res) => {
    subject_1.default.find({}, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
// GET SUBJECT
router.route('/getSubject').post((req, res) => {
    let code = req.body.code;
    subject_1.default.findOne({ 'code': code }, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
// INSERT SUBJECT
router.route('/insertSubject').post((req, res) => {
    let code = req.body.code;
    let title = req.body.title;
    let type = req.body.type;
    let department = req.body.department;
    let semestar = req.body.semestar;
    let espb = req.body.espb;
    let goal = req.body.goal;
    let propositions = req.body.propositions;
    let fondLecture = req.body.fondLecture;
    let fondExercise = req.body.fondExercise;
    let fondLab = req.body.fondLab;
    let classTime = req.body.classTime;
    let excerciseTime = req.body.excerciseTime;
    subject_1.default.collection.insertOne({ 'code': code, 'title': title, 'type': type, 'department': department, 'semestar': semestar,
        'espb': espb, 'goal': goal, 'propositions': propositions, 'fondLecture': fondLecture, 'fondExercise': fondExercise,
        'fondLab': fondLab, 'classTime': classTime, 'excerciseTime': excerciseTime, 'lectureMaterials': [], 'exerciseMaterials': [],
        'examMaterials': {}, 'hasLab': false, 'lab': {}, 'project': {}, 'notifications': []
    });
    res.json({ poruka: 1 });
});
// UPDATE SUBJECT
router.route('/updateSubject').post((req, res) => {
    let code = req.body.code;
    let title = req.body.title;
    let type = req.body.type;
    let department = req.body.department;
    let semestar = req.body.semestar;
    let espb = req.body.espb;
    let goal = req.body.goal;
    let propositions = req.body.propositions;
    let fondLecture = req.body.fondLecture;
    let fondExercise = req.body.fondExercise;
    let fondLab = req.body.fondLab;
    let classTime = req.body.classTime;
    let excerciseTime = req.body.excerciseTime;
    subject_1.default.collection.updateOne({ 'code': code }, { $set: { 'title': title, 'type': type, 'department': department, 'semestar': semestar,
            'espb': espb, 'goal': goal, 'propositions': propositions, 'fondLecture': fondLecture, 'fondExercise': fondExercise,
            'fondLab': fondLab, 'classTime': classTime, 'excerciseTime': excerciseTime } });
    res.json({ poruka: 1 });
});
// UPDATE SUBJECT EXAM MATERIALS
router.route('/updateExamMaterials').post((req, res) => {
    let code = req.body.code;
    let examMaterials = req.body.examMaterials;
    subject_1.default.collection.updateOne({ 'code': code }, { $set: { 'examMaterials': examMaterials } });
    res.json({ poruka: 1 });
});
// UPDATE PROJECT MATERIALS  
router.route('/updateProjectMaterials').post((req, res) => {
    let code = req.body.code;
    let project = req.body.project;
    subject_1.default.collection.updateOne({ 'code': code }, { $set: { 'project': project } });
    res.json({ poruka: 1 });
});
// DELETE SUBJECT
router.route('/deleteSubject').post((req, res) => {
    let code = req.body.code;
    subject_1.default.collection.deleteOne({ 'code': code }, (err, res) => {
        if (err)
            console.log(err);
    });
    res.json({ poruka: 1 });
});
// ADD NEW LAB
router.route('/addNewLab').post((req, res) => {
    let code = req.body.code;
    let lab = {
        "description": "",
        "materials": []
    };
    subject_1.default.collection.updateOne({ 'code': code }, { $push: { 'lab.labDetails': lab }, $inc: { 'lab.numberOfLabs': 1 } });
    res.json({ poruka: 1 });
});
// ADD NEW PROJECT
router.route('/addNewProject').post((req, res) => {
    let code = req.body.code;
    let project = {
        "basicInfo": "",
        "description": "",
        "projectMaterials": []
    };
    subject_1.default.collection.updateOne({ 'code': code }, { $push: { 'project.projects': project } });
    res.json({ poruka: 1 });
});
// ADD SUBJECT NOTIFICATION
router.route('/addNotification').post((req, res) => {
    let code = req.body.code;
    let notification = req.body.notification;
    subject_1.default.collection.updateOne({ 'code': code }, { $push: { 'notifications': notification } });
    res.json({ poruka: 1 });
});
// NOTIFICATIONS
router.route('/getAllNotifications').get((req, res) => {
    let currentDate = new Date(Date.now());
    currentDate.setMonth(currentDate.getMonth() - 3);
    notification_1.default.find({ dateCreation: { $gt: currentDate } }, (err, notifications) => {
        if (err)
            console.log(err);
        else
            res.json(notifications);
    });
});
// GET ENGAGEMENT PLAN
router.route('/getEngagementPlan').get((req, res) => {
    engagementPlan_1.default.find({}, (err, ep) => {
        if (err)
            console.log(err);
        else
            res.json(ep);
    });
});
// GET ENGAGEMENT PLAN FOR SUBJECT
router.route('/getSubjectEngagementPlan').post((req, res) => {
    let subjectCode = req.body.subjectCode;
    engagementPlan_1.default.findOne({ 'subject': subjectCode }, (err, ep) => {
        if (err)
            console.log(err);
        else
            res.json(ep);
    });
});
// DELETE ENGAGEMENT PLAN
router.route('/deleteEngagementPlan').post((req, res) => {
    let subjectCode = req.body.subjectCode;
    engagementPlan_1.default.collection.deleteOne({ 'subject': subjectCode }, (err, res) => {
        if (err)
            console.log(err);
    });
    res.json({ poruka: 1 });
});
// INSERT ENGAGEMENT PLAN
router.route('/insertEngagementPlan').post((req, res) => {
    let subjectCode = req.body.subjectCode;
    let group = req.body.group;
    let employees = req.body.employees;
    engagementPlan_1.default.collection.insertOne({ 'subject': subjectCode, 'group': group, 'employees': employees });
    res.json({ poruka: 1 });
});
// UPDATE SUBJECT LAB
router.route('/updateLabInfo').post((req, res) => {
    let code = req.body.code;
    let lab = req.body.lab;
    subject_1.default.collection.updateOne({ 'code': code }, { $set: { 'lab': lab, 'hasLab': true } });
    res.json({ poruka: 1 });
});
// UPDATE NOTIFICATION
router.route('/updateNotificationInfo').post((req, res) => {
    let subjectCode = req.body.subjectCode;
    let index = req.body.index;
    let notification = req.body.notification;
    let positionTitle = 'notifications.' + index + '.title';
    let positionContent = 'notifications.' + index + '.content';
    subject_1.default.collection.updateOne({ 'code': subjectCode }, { $set: { [positionTitle]: notification.title, [positionContent]: notification.content } });
    res.json({ poruka: 1 });
});
// DELETE NOTIFICATION
router.route('/deleteNotification').post((req, res) => {
    let subjectCode = req.body.subjectCode;
    let title = req.body.title;
    subject_1.default.collection.updateOne({ 'code': subjectCode }, { $pull: { "notifications": { 'title': title } } });
    res.json({ poruka: 1 });
});
// GET ALL LISTS
router.route('/getAllLists').get((req, res) => {
    list_1.default.find({}, (err, lists) => {
        if (err)
            console.log(err);
        else
            res.json(lists);
    });
});
// INSERT LIST
router.route('/insertList').post((req, res) => {
    let lista = req.body.lista;
    list_1.default.collection.insertOne({ 'title': lista.title, 'time': lista.time, 'place': lista.place, 'limit': lista.limit,
        'subject': lista.subject, 'deadline': lista.deadline, 'valid': true, 'files': [] });
    res.json({ poruka: 1 });
});
// CLOSE LIST
router.route('/closeList').post((req, res) => {
    let lista = req.body.lista;
    list_1.default.collection.updateOne({ 'title': lista.title }, { $set: { 'valid': false } });
    res.json({ poruka: 1 });
});
// FILES
const userFiles = '../backend/upload-server/my_uploaded_files/';
app.set('views', './dist/browser');
var path = require('path');
app.put('/files', (req, res) => {
    const file = req.body;
    const fileObject = req.body.file;
    const subjectCode = req.body.subjectCode;
    const material = req.body.material;
    const base64data = file.content.replace(/^data:.*,/, '');
    fs.writeFile(userFiles + file.name, base64data, 'base64', (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            var stats = fs.statSync(userFiles + file.name);
            var fileSize = stats.size / 1024;
            var fileType = ((path.extname(file.name)).substring(1)).toUpperCase();
            fileObject.type = fileType;
            fileObject.size = Math.round(fileSize);
            if (material == 'lecture') {
                subject_1.default.collection.updateOne({ 'code': subjectCode }, { $push: {
                        'lectureMaterials': fileObject
                    } });
            }
            else if (material == 'exercise') {
                subject_1.default.collection.updateOne({ 'code': subjectCode }, { $push: {
                        'exerciseMaterials': fileObject
                    } });
            }
            else if (material == 'examText') {
                subject_1.default.collection.updateOne({ 'code': subjectCode }, { $push: {
                        'examMaterials.examText': fileObject
                    } });
            }
            else if (material == 'examSolution') {
                subject_1.default.collection.updateOne({ 'code': subjectCode }, { $push: {
                        'examMaterials.examSolution': fileObject
                    } });
            }
            else if (material.substring(0, 3) == 'lab') {
                let index = (material.split("."))[1];
                let position = 'lab.labDetails.' + index + '.materials';
                subject_1.default.collection.updateOne({ 'code': subjectCode }, { $push: {
                        [position]: fileObject
                    } });
            }
            else if (material.substring(0, 2) == 'dz') {
                let index = (material.split("."))[1];
                let position = 'project.projects.' + index + '.projectMaterials';
                subject_1.default.collection.updateOne({ 'code': subjectCode }, { $push: {
                        [position]: fileObject
                    } });
            }
            res.set('Location', userFiles + file.name);
            res.status(200);
            res.send(file);
        }
    });
});
app.put('/notificationFiles', (req, res) => {
    const file = req.body;
    const fileObject = req.body.file;
    const base64data = file.content.replace(/^data:.*,/, '');
    fs.writeFile(userFiles + file.name, base64data, 'base64', (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            var stats = fs.statSync(userFiles + file.name);
            var fileSize = stats.size / 1024;
            var fileType = ((path.extname(file.name)).substring(1)).toUpperCase();
            fileObject.type = fileType;
            fileObject.size = Math.round(fileSize);
            res.set('Location', userFiles + file.name);
            res.status(200);
            res.send(fileObject);
        }
    });
});
app.put('/uploadListFiles', (req, res) => {
    const file = req.body;
    const fileObject = req.body.file;
    const listTitle = req.body.listTitle;
    const base64data = file.content.replace(/^data:.*,/, '');
    fs.writeFile(userFiles + file.name, base64data, 'base64', (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            var stats = fs.statSync(userFiles + file.name);
            list_1.default.collection.updateOne({ 'title': listTitle }, { $push: { 'files': fileObject } });
            res.set('Location', userFiles + file.name);
            res.status(200);
            res.send(file);
        }
    });
});
app.put('/uploadNotificationFiles', (req, res) => {
    const file = req.body;
    const fileObject = req.body.file;
    const subjectCode = req.body.subjectCode;
    const index = req.body.index;
    const base64data = file.content.replace(/^data:.*,/, '');
    fs.writeFile(userFiles + file.name, base64data, 'base64', (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            var stats = fs.statSync(userFiles + file.name);
            var fileSize = stats.size / 1024;
            var fileType = ((path.extname(file.name)).substring(1)).toUpperCase();
            fileObject.type = fileType;
            fileObject.size = Math.round(fileSize);
            let position = 'notifications.' + index + '.files';
            subject_1.default.collection.updateOne({ 'code': subjectCode }, { $push: { [position]: fileObject } });
            res.set('Location', userFiles + file.name);
            res.status(200);
            res.send(file);
        }
    });
});
app.get('/download/:name', (request, response) => {
    const name = request.params.name;
    const file = `${userFiles}/${name}`;
    console.log(file);
    response.download(file, function (err) {
        console.log(err);
    });
});
app.delete('/files/**', (req, res) => {
    const fileName = req.url.substring(7).replace(/%20/g, ' ');
    fs.unlink(userFiles + fileName, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        else {
            res.status(204);
            res.send({});
        }
    });
});
// DELETE FILE FROM SUBJECT
router.route('/deleteFileSubject').post((req, res) => {
    let code = req.body.code;
    let material = req.body.material;
    let fileName = req.body.fileName;
    if (material == 'lecture') {
        subject_1.default.collection.updateOne({ 'code': code }, { $pull: { 'lectureMaterials': { 'file': fileName } } });
    }
    else if (material == 'exercise') {
        subject_1.default.collection.updateOne({ 'code': code }, { $pull: { 'exerciseMaterials': { 'file': fileName } } });
    }
    else if (material == 'examText') {
        subject_1.default.collection.updateOne({ 'code': code }, { $pull: { 'examMaterials.examText': { 'file': fileName } } });
    }
    else if (material.substring(0, 3) == 'lab') {
        let index = (material.split("."))[1];
        let position = 'lab.labDetails.' + index + '.materials';
        subject_1.default.collection.updateOne({ 'code': code }, { $pull: { [position]: { 'file': fileName } } });
    }
    else if (material.substring(0, 2) == 'dz') {
        let index = (material.split("."))[1];
        let position = 'project.projects.' + index + '.projectMaterials';
        subject_1.default.collection.updateOne({ 'code': code }, { $pull: { [position]: { 'file': fileName } } });
    }
    res.json({ poruka: 1 });
});
// DELETE FILE FROM NOTIFICATION
router.route('/deleteFileNotification').post((req, res) => {
    let code = req.body.code;
    let index = req.body.index;
    let fileName = req.body.fileName;
    let position = 'notifications.' + index + ".files";
    subject_1.default.collection.updateOne({ 'code': code }, { $pull: { [position]: { 'file': fileName } } });
    res.json({ poruka: 1 });
});
app.use('/', router);
app.use('/files', express_1.default.static(userFiles));
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map