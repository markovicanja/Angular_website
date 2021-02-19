import { FileModel } from "./file.model";

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
    lectureMaterials: Array<FileModel>;
    exerciseMaterials: Array<FileModel>;
    examMaterials: {
        hidden: boolean;
        examText: Array<FileModel>;
        examSolution: Array<FileModel>;
    };
    hasLab: boolean;
    lab: {
        hidden: boolean;
        basicInfo: string;
        numberOfLabs: number;
        labDetails: [
            {
                description: string,
                materials: Array<FileModel>
            }
        ]
    };
    project: {
        hidden: boolean, 
        projects: [
            {
                basicInfo: string,
                description: string,
                projectMaterials: Array<FileModel>
            }
        ]
    };
    notifications: [
        {
            title: string;
            content: string;
            creator: string;
            dateCreation: Date;
            files: Array<FileModel>;
        }
    ];
}