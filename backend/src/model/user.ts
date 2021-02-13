import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const User = new Schema( {
    id: {
        type: Number,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    email: {
        type: String,
    },
    status: {
        type: Number,
    },
    type: {
        type: String,
    },
});

export default mongoose.model('User', User, 'users');