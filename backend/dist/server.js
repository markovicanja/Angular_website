"use strict";
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
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
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
router.route('/getStudent').post((req, res) => {
    let username = req.body.username;
    student_1.default.findOne({ 'username': username }, (err, s) => {
        if (err)
            console.log(err);
        else
            res.json(s);
    });
});
router.route('/getEmployee').post((req, res) => {
    let username = req.body.username;
    user_1.default.findOne({ 'username': username }, (err, e) => {
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
    student_1.default.collection.insertOne({ 'username': username, 'index': index, 'type': type, 'firstName': firstName, 'lastName': lastName, 'status': status });
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
    // let profilePicture = req.body.profilePicture;
    user_1.default.collection.insertOne({ 'username': username, 'password': password, 'type': 'zaposlen', 'changedPassword': false });
    employee_1.default.collection.insertOne({ 'username': username, 'firstName': firstName, 'lastName': lastName, 'address': address,
        'phoneNumber': phoneNumber, 'webpage': webpage, 'personalInfo': personalInfo, 'title': title, 'room': room, 'status': status,
        'type': type, 'profilePicture': {} });
    res.json({ poruka: 1 });
});
// router.route('/registerAdmin').post((req, res) => {
//     let username = req.body.username;
//     let password = req.body.password;
//     user.collection.insertOne({'username' : username, 'password' : password, 'type' : 'admin', 'changedPassword': false});
// });
// RESET PASSWORD
router.route('/resetPassword').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.collection.updateOne({ 'username': username }, { $set: { "password": password, "changedPassword": true } });
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
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map