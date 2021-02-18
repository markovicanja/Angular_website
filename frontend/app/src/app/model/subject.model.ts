export class Subject {
    code: string;
    title: string;
    type: string;
    department: Array<string>;
    semestar: number;
    espb: number;
    goal: string;
    propositions: string;
    fond: {
        lecture: string;
        exercise: string;
        lab: string;
    };
    classTime: Array<string>;
    excerciseTime: Array<string>;
    lectureMaterials: Array<string>;
    exerciseMaterials: Array<string>;
    examMaterials: {
        hidden: boolean;
        examText: Array<string>;
        examSolution: Array<string>;
    };
    hasLab: boolean;
    lab: {
        hidden: boolean;
        basicInfo: string;
        numberOfLabs: number;
        labDetails: [
            {
                description: string,
                materials: Array<string>
            }
        ]
    };
    project: {
        hidden: boolean, 
        projects: [
            {
                basicInfo: string,
                description: string,
                projectMaterials: Array<String>
            }
        ]
    };
    notifications: [
        {
            title: string;
            content: string;
            creator: string;
            dateCreation: Date;
            files: Array<string>;
        }
    ];
}