import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const Subject = new Schema({
    code: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },    
    type: {
        type: String,
        required: true
    },
    department: { // master, si, rti, ostali
        type: [String],
        required: true
    },
    semestar: {
        type: Number,
        required: true,
    },
    espb: {
        type: Number,
        required: true
    },
    goal: {
        type: String,
        required: true
    },
    propositions: {
        type: String,
        required: true
    },
    fondLecture: {
        type: Number,
        required: true
    },
    fondExercise: {
        type: Number,
        required: true
    },
    fondLab: {
        type: Number,
        required: true
    },     
    classTime: {
        type: [String],
        required: true
    },
    excerciseTime: {
        type: [String],
        required: true
    },
    lectureMaterials: {
        type: [String],
        required: false
    },
    exerciseMaterials: {
        type: [String],
        required: false
    },
    examMaterials: {
        type: {
            examText: {
                type: [String],
                required: false
            },
            examSolution: {
                type: [String],
                required: false
            },
            hidden: {
                type: Boolean,
                required: true,
            }
        },
        required: true
    },
    hasLab: {
        type: Boolean,
        required: true
    },
    lab: {
        type: {
            hidden: {
                type: Boolean,
                required: true
            },
            basicInfo: {
                type: String,
                required: false
            },
            numberOfLabs: {
                type: Number,
                required: true
            },
            labDetails: {
                type: [{
                    description: {
                        type: String,
                        required: true
                    },
                    materials: {
                        type: [String],
                        required: true
                    }
                }],
                required: true
            }
        },
        required: true
    },
    project: {
        type: {
            hidden: {
                type: Boolean,
                required: true
            },
            projects: {
                type: [{
                    basicInfo: {
                        type: String,
                        required: true
                    },
                    description: {
                        type: String,
                        required: true
                    },
                    projectMaterials: {
                        type: [String],
                        required: false
                    }
                }],
                required: true
            }
        },
        required: true
    },
    notifications: {
        type: [{
            title: {
                type: String,
                required: true
            },
            creator: {
                type: String,
                required: true
            }, 
            content: {
                type: String,
                required: true
            },
            dateCreation: {
                type: Date,
                required: true
            },
            files: {
                type: [String],
                required: false
            }
        }],
        required: false
    }
});

export default mongoose.model('Subject', Subject, 'subjects');