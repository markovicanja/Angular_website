"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Employee = new Schema({
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    webpage: {
        type: String,
        required: false
    },
    personalInfo: {
        type: String,
        required: false
    },
    title: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: false
    }
});
exports.default = mongoose_1.default.model('Employee', Employee, 'employees');
//# sourceMappingURL=employee.js.map