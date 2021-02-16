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
// UPLOAD PROFILE PICTURE
const profilePictureUrl = "src/uploaded_files/profile_pictures";
const subjectInfoFilesUrl = "src/uploaded_files/subjects";
const multer = require('multer');
var sizeOf = require('image-size');
var fileExtension = require('file-extension');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, profilePictureUrl);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname));
    }
});
var upload = multer({
    storage: storage,
    limits: {
        fileSize: 2000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            cb(new Error('Please upload JPG and PNG images only!'));
        }
        cb(undefined, true);
    }
});
app.post('/uploadfile', upload.single('uploadedImage'), (req, res, next) => {
    const username = req.body.employeeUsername;
    const file = req.file;
    if (!file) {
        res.status(400).json({ error: "Greska pri otpremanju slike." });
        return;
    }
    let fileUrl = file.destination + '/' + file.filename;
    const dimensions = sizeOf(fileUrl);
    if (dimensions.width > 300 || dimensions.height > 300) {
        res.status(400).json({ error: "Slika ne moze da bude vecih dimenzija od 300x300." });
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
    employee_1.default.findOneAndUpdate({ username: username }, { profilePicture: finalImg }, (err, result) => {
        if (err) {
            res.status(400).send({
                error: "GRESKA"
            });
        }
        res.status(200).send({
            statusCode: 200,
            status: 'success',
            finalImg: finalImg
        });
    });
});
var storageInfoFile = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, subjectInfoFilesUrl);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + fileExtension(file.originalname));
    }
});
var uploadInfoFile = multer({
    storage: storageInfoFile,
    limits: {
        fileSize: 10000000 //2MBs
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(pdf|pptx|zip|7z)$/)) {
            //Error
            cb(new Error('Please upload PDF, PPTX, ZIP, 7Z files only!'));
        }
        //Success
        cb(undefined, true);
    }
});
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map