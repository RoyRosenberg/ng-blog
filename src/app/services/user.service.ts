import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '../models/user';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:59253/api';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/Users`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/Users/${id}`);
  }

  createUser(user: User): Observable<User> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(user);
    return this.http.post<User>(`${this.baseUrl}/Users`, body, { headers: header });
  }

  updateUser(user: User): Observable<User> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify(user);
    return this.http.put<User>(`${this.baseUrl}/Users`, body, { headers: header });
  }
}
