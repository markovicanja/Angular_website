"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const EngagementPlan = new Schema({
    subject: {
        type: String,
        required: true
    },
    group: {
        type: [{
                name: {
                    type: String,
                    required: true
                },
                employees: {
                    type: [String],
                    required: true
                }
            }],
        required: true
    },
    employees: {
        type: [String],
        required: true
    }
});
exports.default = mongoose_1.default.model('EngagementPlan', EngagementPlan, 'engagementPlan');
//# sourceMappingURL=engagementPlan.js.map