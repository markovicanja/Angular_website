import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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

export default mongoose.model('EngagementPlan', EngagementPlan, 'engagementPlan');