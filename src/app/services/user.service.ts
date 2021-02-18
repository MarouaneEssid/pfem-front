import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }
  
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users/all`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${environment.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

  deleteUsers(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/users`);
  }

  getUsersByRole(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users/role/${id}`);
  }

  updateUserPassword(id: number, password: string): Observable<User> {
    return this.http.put<any>(`${environment.apiUrl}/users/password/${id}`, password)  ;
  }


}