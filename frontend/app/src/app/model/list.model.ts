export class ListModel {
    title: string;
    time: string;
    place: string;
    limit: number;
    subject: string;
    deadline: Date;
    valid: boolean;
    files: [{
       student: string,
       file: string 
    }];
}