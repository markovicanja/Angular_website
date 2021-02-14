import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('Student', Student, 'students');