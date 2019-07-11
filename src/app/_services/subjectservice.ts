import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Subject } from '../_models/subject';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SubjectService {

  private subjectsUrl = 'api/subject';
  public currentUser = '';

  constructor(
    private http: HttpClient
  ) { }

  getSubjects (): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectsUrl);
  }
}