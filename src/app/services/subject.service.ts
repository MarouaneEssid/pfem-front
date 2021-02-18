import { Injectable } from '@angular/core';
import { Subject } from '../models/subject';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(`${environment.apiUrl}/subjects`);
  }

  getSubject(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${environment.apiUrl}/subjects/${id}`);
  }

  addSubject(subject: Subject): Observable<any> {
    return this.http.post(`${environment.apiUrl}/subjects`, subject);
  }

  updateSubject(id: number, subject: Subject): Observable<any> {
    return this.http.put(`${environment.apiUrl}/subjects/${id}`, subject);
  }

  deleteSubject(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/subjects/${id}`)
  }

}
