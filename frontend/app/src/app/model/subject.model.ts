export class Subject {
    code: string;
    title: string;
    type: string;
    department: string;
    semestar: number;
    espb: number;
    goal: string;
    propositions: string;
    fond: object;
    classTime: Array<string>;
    excerciseTime: Array<string>;
    lectureMaterials: Array<string>;
    exerciseMaterials: Array<string>;
    examMaterials: object;
    hasLab: boolean;
    lab: object;
    project: object;
    lecturers: Array<string>;
    notifications: object;
}