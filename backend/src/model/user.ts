import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["admin", "zaposleni", "student"]
    },
    changedPassword: {
        type: Boolean,
        required: true
    }
});

export default mongoose.model('User', User, 'users');