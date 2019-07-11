import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { UsersService } from '../../../_services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fileuploader',
  templateUrl: './fileuploader.component.html',
  styleUrls: ['./fileuploader.component.css']
})
export class FileuploaderComponent {
  public progress: number;  
  public message: string;  
  constructor(
    private http: HttpClient,
    private userService: UsersService,
    private router: Router) { }
  
  uploadFile(files) {  
    if (files.length === 0)  
      return;  

    const formData = new FormData();
    for (let file of files)
      formData.append('file', file, file.name);
    
    const uploadReq = new HttpRequest('POST', `api/lesson/file/${this.userService.currentUser}`, formData, {  
      reportProgress: true,  
    });  

    this.http.request(uploadReq).subscribe(event => {  
      if (event.type === HttpEventType.Response)  
        this.message = event.body.toString();  
    });  

    setTimeout(() => {
      this.router.navigate(['/calendar']);
    }, 5000);
  }

}
