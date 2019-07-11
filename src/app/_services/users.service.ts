import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';

import { User } from '../_models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  private usersUrl = 'api/user';
  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: string;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUserSubject.asObservable().subscribe(response => { this.currentUser = response; });
  }

  login(username: string) {
    localStorage.setItem('currentUser', JSON.stringify(username));
    this.currentUserSubject.next(username);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getUsers (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser (name: string): Observable<User> {
    const url = `${this.usersUrl}/${name}`;
    return this.http.get<User>(url);
  }

  addUser (user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, httpOptions);
  }
  updatePassword (user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.username}`;
    return this.http.put<User>(url, user, httpOptions);
  }
}
