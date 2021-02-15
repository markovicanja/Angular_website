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