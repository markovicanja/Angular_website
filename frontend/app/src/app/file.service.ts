import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { FileModel } from './model/file.model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private fileList: string[] = new Array<string>();
  private fileList$: Subject<string[]> = new Subject<string[]>();
  private displayLoader$: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  public isLoading(): Observable<boolean> {
    return this.displayLoader$;
  }

  public upload(fileName: string, fileContent: string, file: FileModel, subjectCode: String, material: String): void {
    const data = {
      name: fileName,
      content: fileContent,
      file: file,
      subjectCode: subjectCode,
      material: material
    }
    this.displayLoader$.next(true);    
    this.http.put(`${this.uri}/files`, data)
    .pipe(finalize(() => this.displayLoader$.next(false)))
    .subscribe(res => {
      this.fileList.push(fileName);
      this.fileList$.next(this.fileList);
    }, error => {
      this.displayLoader$.next(false);
    });
  }

  public uploadFiles(fileName: string, fileContent: string, file: FileModel) {
    const data = {
      name: fileName,
      content: fileContent,
      file: file
    }
    this.displayLoader$.next(true);    
    return this.http.put(`${this.uri}/notificationFiles`, data);
  }

  public download(fileName: string): void {
    this.http.get(`${this.uri}/files/${fileName}`, { responseType: 'blob'}).subscribe(res => {
      window.open(window.URL.createObjectURL(res));
    });
  }

  public remove(fileName): void {
    this.http.delete(`${this.uri}/files/${fileName}`).subscribe(() => {
      this.fileList.splice(this.fileList.findIndex(name => name === fileName), 1);
      this.fileList$.next(this.fileList);
    });
  }

  public list(): Observable<string[]> {
    return this.fileList$;
  }

  private addFileToList(fileName: string): void {
    this.fileList.push(fileName);
    this.fileList$.next(this.fileList);
  }
}