import { FileModel } from "./file.model";

export class SubjectNotification {
    title: string;
    content: string;
    creator: string;
    dateCreation: Date;
    files: Array<FileModel>;
}