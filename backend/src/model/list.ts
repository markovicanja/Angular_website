import mongoose from 'mongoose'

const Schema = mongoose.Schema;

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


export default mongoose.model('List', ListModel, 'lists');