import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const Notification = new Schema({
    title : {
        type: String
    },
    content :{
        type: String
    },
    type:{
        type: String
    },
    dateCreation:{
        type: Date
    }
});

export default mongoose.model('Notification', Notification, 'notifications');