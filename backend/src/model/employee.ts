import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('Employee', Employee, 'employees');