import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Technology } from '../models/technology';
import { environment } from '../../environments/environment';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(private http: HttpClient) { }

  getTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${environment.apiUrl}/technologies/all`);
  }

  getTechnology(id: number): Observable<Technology> {
    return this.http.get<Technology>(`${environment.apiUrl}/technologies/${id}`);
  }

  addTechnology(technology: Technology): Observable<any> {
    return this.http.post(`${environment.apiUrl}/technologies`, technology);
  }

  updateTechnology(technology: Technology): Observable<any> {
    return this.http.patch(`${environment.apiUrl}/technologies/${technology.id}`, technology);
  }


}
