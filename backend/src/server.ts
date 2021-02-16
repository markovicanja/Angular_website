import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';
import notification from './model/notification';
import student from './model/student';
import employee from './model/employee';

const app = express();

app.use(cors());
app.use(bodyParser.json());

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

router.route('/getStudent').post((req, res) => {
    let username = req.body.username;
    
    student.findOne({'username' : username}, (err, s) => {
        if (err) console.log(err);
        else res.json(s);
    });
});

router.route('/getEmployee').post((req, res) => {
    let username = req.body.username;
    
    user.findOne({'username' : username}, (err, e) => {
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
    student.collection.insertOne({'username' : username, 'index' : index, 'type' : type, 'firstName': firstName, 'lastName': lastName, 'status': status});
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

// router.route('/registerAdmin').post((req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;

//     user.collection.insertOne({'username' : username, 'password' : password, 'type' : 'admin', 'changedPassword': false});
// });

// NOTIFICATIONS
router.route('/getAllNotifications').get((req, res) => {
    let currentDate = new Date(Date.now())
    currentDate.setMonth(currentDate.getMonth() - 3);

    notification.find({dateCreation: { $gt: currentDate }}, (err, notifications) => {
        if (err) console.log(err);
        else res.json(notifications);
    });
});

app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));