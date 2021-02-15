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
        required: true,
        enum: ["redovni profesor", "vanredni profesor", "docent", "asistent", "saradnik u nastavi", "istrazivac", "laboratorijski inzenjer", "laboratorijski tehnicar"]
    },
    room: {
        type: String,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: ["aktivan", "neaktivan"]
    },
    type: {
        type: String,
        required: true,
        enum: ["nastavnik", "laborant"]
    },
    profilePicture: {
        type: String,
        required: false
    }  
});

export default mongoose.model('Employee', Employee, 'employees');