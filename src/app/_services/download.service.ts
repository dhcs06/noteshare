import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestOptions, ResponseContentType } from '@angular/http';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
@Injectable()
    export class DownloadService{
        private _url: string = "api/upload";

        constructor(private http: HttpClient){}

        downloadFile(code): Observable<Blob> {
            const options = new RequestOptions({responseType: ResponseContentType.Blob });
            return this.http.get(this._url + '/' + code,  { responseType: 'blob' });
        }

        displayFiles(code): Observable<any>{
            return this.http.get(this._url + "/file1/" + code);
        }
    }