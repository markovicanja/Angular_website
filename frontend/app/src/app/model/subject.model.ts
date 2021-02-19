import { File } from "./file.model";

export class Subject {
    code: string;
    title: string;
    type: string;
    department: Array<string>;
    semestar: number;
    espb: number;
    goal: string;
    propositions: string;
    fondLecture: number;
    fondExercise: number;
    fondLab: number;
    classTime: Array<string>;
    excerciseTime: Array<string>;
    lectureMaterials: Array<File>;
    exerciseMaterials: Array<File>;
    examMaterials: {
        hidden: boolean;
        examText: Array<File>;
        examSolution: Array<File>;
    };
    hasLab: boolean;
    lab: {
        hidden: boolean;
        basicInfo: string;
        numberOfLabs: number;
        labDetails: [
            {
                description: string,
                materials: Array<File>
            }
        ]
    };
    project: {
        hidden: boolean, 
        projects: [
            {
                basicInfo: string,
                description: string,
                projectMaterials: Array<File>
            }
        ]
    };
    notifications: [
        {
            title: string;
            content: string;
            creator: string;
            dateCreation: Date;
            files: Array<File>;
        }
    ];
}