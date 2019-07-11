import { Component, OnInit, Output } from '@angular/core';  
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import {RequestOptions, Request, RequestMethod, ResponseContentType} from '@angular/http';
import { UsersService } from '../../_services/users.service';
import { SubjectService } from 'src/app/_services/subjectservice';
import { Observable } from 'rxjs';
import { Subject } from '../../_models/subject';
import {saveAs as importedSaveAs} from "file-saver";
import { DownloadService } from 'src/app/_services/download.service';
import { saveFile } from '../../_models/filedownload.helper';

  
@Component({  
  selector: 'app-noteshare',
  templateUrl: './noteshare.component.html',
  styleUrls: ['./noteshare.component.css']
})  
export class NoteshareComponent {  
  @Output() select;
  public progress: number;  
  public message: string;  
  allSubject: Array<Subject> = [];
  form: any = {};
  code: string = "";
  existFiles: boolean = false;
  first: boolean = true;

  constructor(
    private http: HttpClient,
    private userService: UsersService,
    private subjectService: SubjectService,
    private downloadService: DownloadService) { }

    ngOnInit() {
      this.subjectService.getSubjects().subscribe(
        _ => {
          _.forEach(element => {
            this.allSubject.push(element);
          });
          console.log(this.allSubject);
        }
      )
    }

  filterNote(event) {
    this.code = event.target.value;
    this.downloadService.displayFiles(this.code).subscribe(
      files => {
        this.location = "api/upload/" + this.code;
        this.existFiles = true;
        this.filesName = files;
        this.first = false;
        
      },
      err => {
        this.existFiles = false;
        this.first = false;
      }
    );
  }

  onSelect(event){
    this.code = event.target.value;
  }

  uploadNote(files){
    if (files.length === 0)  
      return;  

    const formData = new FormData();
    for (let file of files)
      formData.append('file', file, file.name);
      
    const uploadReq = new HttpRequest('POST', `api/upload/file/${this.code}`, formData, {  
      reportProgress: true,  
    });

    this.http.request(uploadReq).subscribe(event => {  
      if (event.type === HttpEventType.UploadProgress)  
        this.progress = Math.round(100 * event.loaded / event.total);  
      else if (event.type === HttpEventType.Response)  
        this.message = event.body.toString();  
    });
  }
  location: any = {}
  filesName: any = {}

  downloadFile(fileName){
    this.downloadService.downloadFile(this.code).subscribe(
      response => {
        let blob = new Blob([response], {type: 'text/txt'});
        saveFile(blob, fileName);
      }
    );
  }
}  