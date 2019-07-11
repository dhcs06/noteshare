import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ILesson} from '../_models/lesson';
import { Observable } from 'rxjs';

@Injectable()
    export class LessonService{

        private _url: string = "api/lesson/current_user";

        constructor(private http: HttpClient){}

        getStart(start:string): Observable<ILesson[]>{
            const url = `${this._url}/${start}`;
            return this.http.get<ILesson[]>(this._url);
        }

        getEnd(end: string): Observable<ILesson[]>{
            const url = `${this._url}/${end}`;
            return this.http.get<ILesson[]>(this._url);
        }

        getSummary(summary:string):Observable<ILesson[]>{
            const url = `${this._url}/${summary}`;
            return this.http.get<ILesson[]>(this._url);
        }

        getLocation(location:string):Observable<ILesson[]>{
            const url = `${this._url}/${location}`;
            return this.http.get<ILesson[]>(this._url);
        }
    }
