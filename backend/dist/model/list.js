"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ListModel = new Schema({
    title: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    limit: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    deadline: {
        type: Date,
        required: false
    },
    valid: {
        type: Boolean,
        required: true
    },
    files: {
        type: [{
                student: {
                    type: String
                },
                file: {
                    type: String,
                    required: false
                }
            }],
        required: true
    }
});
exports.default = mongoose_1.default.model('List', ListModel, 'lists');
//# sourceMappingURL=list.js.map