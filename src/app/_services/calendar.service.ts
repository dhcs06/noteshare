import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILesson } from '../_models/lesson';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class CalendarService {
    private lessonsUrl = 'api/lesson';
    public currentUser = '';

    constructor(
        private http: HttpClient
      ) { }

      getLessons (): Observable<ILesson[]> {
        return this.http.get<ILesson[]>(this.lessonsUrl);
      }

      getLesson (name: string): Observable<ILesson> {
        const url = `${this.lessonsUrl}/${name}`;
        return this.http.get<ILesson>(url);
      }

      updateEvents (lesson: ILesson, name: string): Observable<ILesson> {
        const url = `${this.lessonsUrl}/file1/${name}`;
        return this.http.post<ILesson>(url, lesson, httpOptions);
      }

}