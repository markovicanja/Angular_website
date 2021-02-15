"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const Student = new Schema({
    username: {
        type: String,
        required: true
    },
    index: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["d", "m", "p"]
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["aktivan", "neaktivan"]
    },
    subjects: {
        type: [String],
        required: false
    }
});
exports.default = mongoose_1.default.model('Student', Student, 'students');
//# sourceMappingURL=student.js.map