import express, { json } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';
import notification from './model/notification';
import student from './model/student';
import employee from './model/employee';
import * as fs from "fs"
import subject from './model/subject';
import engagementPlan from './model/engagementPlan';

const app = express();

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

mongoose.connect('mongodb://localhost:27017/RTI_katedra');

const conn = mongoose.connection;

conn.once('open', () => {
    console.log('mongo open');
});

const router = express.Router();

// LOGIN
router.route('/login').post((req, res) => {
    let username = req.body.username;
    
    user.findOne({'username' : username}, (err, user) => {
        if (err) console.log(err);
        else res.json(user);
    });
});

// GET STUDENT
router.route('/getStudent').post((req, res) => {
    let username = req.body.username;
    
    student.findOne({'username' : username}, (err, s) => {
        if (err) console.log(err);
        else res.json(s);
    });
});

// GET EMPLOYEE
router.route('/getEmployee').post((req, res) => {
    let username = req.body.username;
    
    employee.findOne({'username' : username}, (err, e) => {
        if (err) console.log(err);
        else res.json(e);
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

    user.collection.insertOne({'username' : username, 'password' : password, 'type' : 'student', 'changedPassword': false});
    student.collection.insertOne({'username' : username, 'index' : index, 'type' : type, 'firstName': firstName, 
    'lastName': lastName, 'status': status});
    res.json({poruka: 1});
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
    // let profilePicture = req.body.profilePicture;
    
    user.collection.insertOne({'username' : username, 'password' : password, 'type' : 'zaposlen', 'changedPassword': false});
    employee.collection.insertOne({'username' : username, 'firstName' : firstName, 'lastName' : lastName, 'address': address, 
    'phoneNumber': phoneNumber, 'webpage': webpage, 'personalInfo': personalInfo, 'title': title, 'room': room, 'status': status, 
    'type': type, 'profilePicture' : {} });
    res.json({poruka: 1});
});

// RESET PASSWORD
router.route('/resetPassword').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    
    user.collection.updateOne({'username': username}, {$set: {"password": password, "changedPassword": true}});
    res.json({poruka: 1});
});

// GET EMPLOYEES
router.route('/getAllEmployees').get((req, res) => {
    employee.find({}, (err, employees) => {
        if (err) console.log(err);
        else res.json(employees);
    });
});

// GET ALL USERS
router.route('/getAllUsers').get((req, res) => {
    user.find({}, (err, users) => {
        if (err) console.log(err);
        else res.json(users);
    });
});

// UPDATE EMPLOYEE
router.route('/updateEmployee').post((req, res) => {
    let username = req.body.username;
    let address = req.body.address;
    let phoneNumber = req.body.phoneNumber;
    let personalInfo = req.body.personalInfo;
    let room = req.body.room;

    employee.collection.updateOne({'username': username}, {$set: {"address": address, "phoneNumber": phoneNumber, 
    "personalInfo": personalInfo, "room": room}});
    res.json({poruka: 1});
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

    employee.collection.updateOne({'username': username}, {$set: {"address": address, "phoneNumber": phoneNumber, 
    "webpage": webpage, "title": title, "status": status, "personalInfo": personalInfo, "room": room }});
    res.json({poruka: 1});
});

// ADMIN UPDATE STUDENT 
router.route('/adminUpdateStudent').post((req, res) => {
    let oldUsername = req.body.oldUsername;
    let username = req.body.username;
    let index = req.body.index;
    let status = req.body.status;
    let type = req.body.type;

    student.collection.updateOne({'username': oldUsername}, {$set: {"index": index, "status": status, 
    "type": type, "username": username}});
    user.collection.updateOne({'username' : oldUsername}, {$set: {"username": username}});
    res.json({poruka: 1});
});

// DELETE USER
router.route('/deleteUser').post((req, res) => {
    let username = req.body.username;
    let type = req.body.type;

    user.collection.deleteOne({'username': username}, (err, res) => {
        if (err) console.log(err);
        // else console.log("1 document deleted");
    });

    if (type == "student") {
        student.collection.deleteOne({'username': username}, (err, res) => {
            if (err) console.log(err);
        });
    }
    else {
        employee.collection.deleteOne({'username': username}, (err, res) => {
            if (err) console.log(err);
        });
    }
    res.json({poruka: 1});
});

// GET ALL SUBJECTS
router.route('/getAllSubjects').get((req, res) => {
    subject.find({}, (err, s) => {
        if (err) console.log(err);
        else res.json(s);
    })
})

// GET SUBJECT
router.route('/getSubject').post((req, res) => {
    let code = req.body.code;

    subject.findOne({'code': code}, (err, s) => {
        if (err) console.log(err);
        else res.json(s);
    })
})

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

    subject.collection.insertOne({'code' : code, 'title' : title, 'type' : type, 'department': department, 'semestar': semestar,
    'espb': espb, 'goal': goal, 'propositions': propositions, 'fondLecture': fondLecture, 'fondExercise': fondExercise,
    'fondLab' : fondLab, 'classTime': classTime, 'excerciseTime': excerciseTime, 'lectureMaterials' : [], 'exerciseMaterials': [],
    'examMaterials': {}, 'hasLab': false, 'lab': {}, 'project': {}, 'notifications': []
    });
    res.json({poruka: 1});
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

    subject.collection.updateOne({'code' : code}, {$set : {'title' : title, 'type' : type, 'department': department, 'semestar': semestar,
    'espb': espb, 'goal': goal, 'propositions': propositions, 'fondLecture': fondLecture, 'fondExercise': fondExercise,
    'fondLab' : fondLab, 'classTime': classTime, 'excerciseTime': excerciseTime }});
    res.json({poruka: 1});
});

// UPDATE SUBJECT EXAM MATERIALS
router.route('/updateExamMaterials').post((req, res) => { // NOT WORKING
    let code = req.body.code;
    let examMaterials = req.body.examMaterials;

    subject.collection.updateOne({'code' : code}, {$set : {'examMaterials' : examMaterials }});
    res.json({poruka: 1});
});

// DELETE SUBJECT
router.route('/deleteSubject').post((req, res) => {
    let code = req.body.code;

    subject.collection.deleteOne({'code': code}, (err, res) => {
        if (err) console.log(err);
    });
    res.json({poruka: 1});
});

// NOTIFICATIONS
router.route('/getAllNotifications').get((req, res) => {
    let currentDate = new Date(Date.now())
    currentDate.setMonth(currentDate.getMonth() - 3);

    notification.find({dateCreation: { $gt: currentDate }}, (err, notifications) => {
        if (err) console.log(err);
        else res.json(notifications);
    });
});

// GET ENGAGEMENT PLAN
router.route('/getEngagementPlan').get((req, res) => {
    engagementPlan.find({}, (err, ep) => {
        if (err) console.log(err);
        else res.json(ep);
    });
});

// GET ENGAGEMENT PLAN FOR SUBJECT
router.route('/getSubjectEngagementPlan').post((req, res) => {
    let subjectCode = req.body.subjectCode;

    engagementPlan.findOne({'subject': subjectCode}, (err, ep) => {
        if (err) console.log(err);
        else res.json(ep);
    });
});

// DELETE ENGAGEMENT PLAN
router.route('/deleteEngagementPlan').post((req, res) => {
    let subjectCode = req.body.subjectCode;

    engagementPlan.collection.deleteOne({'subject': subjectCode}, (err, res) => {
        if (err) console.log(err);
    });
    res.json({poruka: 1});
});

// INSERT ENGAGEMENT PLAN
router.route('/insertEngagementPlan').post((req, res) => {
    let subjectCode = req.body.subjectCode;
    let group = req.body.group;
    let employees = req.body.employees;

    engagementPlan.collection.insertOne({'subject' : subjectCode, 'group': group, 'employees': employees});
    res.json({poruka: 1});
});

// FILES
const userFiles = '../backend/upload-server/my_uploaded_files/';
app.set('views', './dist/browser');
var path = require('path')

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
        } else {
            var stats = fs.statSync(userFiles + file.name);
            var fileSize = stats.size / 1024;
            
            var fileType = ((path.extname(file.name)).substring(1)).toUpperCase();
            fileObject.type = fileType;
            fileObject.size = Math.round(fileSize);

            if (material == 'lecture') {
                subject.collection.updateOne({'code' : subjectCode}, {$push : {
                    'lectureMaterials': fileObject
                }});
            }
            else if (material == 'exercise') {
                subject.collection.updateOne({'code' : subjectCode}, {$push : {
                    'exerciseMaterials': fileObject
                }});
            }
            else if (material == 'examText') {
                subject.collection.updateOne({'code' : subjectCode}, { $push : {
                    'examMaterials.examText' : fileObject
                }});
            }
            else if (material == 'examSolution') {
                subject.collection.updateOne({'code' : subjectCode}, { $push : {
                    'examMaterials.examSolution' : fileObject
                }});
            }

            res.set('Location', userFiles + file.name);
            res.status(200);
            res.send(file);
        }
    });
});

app.get('/download/:name', (request, response) => {
    const name = request.params.name;
    const file = `${userFiles}/${name}`;
    console.log(file)
    response.download(file, function (err) {
        console.log(err);
    });
})

app.delete('/files/**', (req, res) => {
    const fileName = req.url.substring(7).replace(/%20/g, ' ');
    fs.unlink(userFiles + fileName, (err) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
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
        subject.collection.updateOne({'code' : code}, {$pull : {'lectureMaterials' : { 'file': fileName }}});
    }
    else if (material == 'exercise') {        
        subject.collection.updateOne({'code' : code}, {$pull : {'exerciseMaterials' : { 'file': fileName }}});
    }
    else if (material == 'examText') {        
        subject.collection.updateOne({'code' : code}, {$pull : {'examMaterials.examText' : { 'file': fileName } }});
    }
    
    res.json({poruka: 1});
});

// UPLOAD PROFILE PICTURE
const profilePictureUrl = "src/uploaded_files/profile_pictures";
const subjectInfoFilesUrl = "src/uploaded_files/subjects";
const multer = require('multer');
var sizeOf = require('image-size');
var fileExtension = require('file-extension');

var storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, profilePictureUrl);
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter(req: any, file: any, cb: any) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload JPG and PNG images only!'))
        }
        cb(undefined, true)
    }
});

app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const username = req.body.employeeUsername;
    const file = (req as any).file;
    
    if (!file) {
        res.status(400).json({error: "Greska pri otpremanju slike."})
        return;
    }
    let fileUrl = file.destination + '/' + file.filename;
    const dimensions = sizeOf(fileUrl);
    if (dimensions.width > 300 || dimensions.height > 300) {
        res.status(400).json({error: "Slika ne moze da bude vecih dimenzija od 300x300."})
        return;
    }
    let newFileUrl = file.destination + '/' + username + "." + fileExtension(file.originalname);
    fs.renameSync(fileUrl, newFileUrl);
    var img = fs.readFileSync(newFileUrl);
    var encode_image = Buffer.from(img).toString('base64');
    var finalImg = {
        contentType: file.mimetype,
        image: encode_image
    };
    employee.findOneAndUpdate({username: username}, {profilePicture: finalImg}, (err, result) => {
        if (err) {
            res.status(400).send({
                error: "GRESKA"
            })
        }
        res.status(200).send({
            statusCode: 200,
            status: 'success',
            finalImg: finalImg
        })
    })
})


var storageInfoFile = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, subjectInfoFilesUrl);
    },
    filename: function (req: any, file: any, cb: any) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname))
    }
});

var uploadInfoFile = multer({
    storage: storageInfoFile,
    limits: {
        fileSize: 10000000 //2MBs
    },
    fileFilter(req: any, file: any, cb: any) {
        if (!file.originalname.match(/\.(pdf|pptx|zip|7z)$/)) {
            //Error
            cb(new Error('Please upload PDF, PPTX, ZIP, 7Z files only!'))
        }
        //Success
        cb(undefined, true)
    }
});

app.use('/', router);
app.use('/files', express.static(userFiles));
app.listen(4000, () => console.log(`Express server running on port 4000`));