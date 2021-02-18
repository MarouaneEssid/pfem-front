import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest, HttpEvent } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Application } from "../models/application";

const apiUrl = "http://localhost:3035/applications";
@Injectable({
  providedIn: "root",
})
export class ApplicationService {
  constructor(private http: HttpClient) {}
  addApplication(application: Application): Observable<any> {
    return this.http.post(`${apiUrl}`, application);
  }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append("file", file);
    const req = new HttpRequest("POST", `${apiUrl}/upload`, formData, {
      reportProgress: true,
      responseType: "json",
    });

    return this.http.request(req);
  }
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string) {
    console.log(message);
  }

  getApplicationsByCollabId(id: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${apiUrl}/collab/${id}`)
  }

  downloadResume(id:number, name:string): string {
    return `${apiUrl}/download/${id}/${name}`

  }
  getApplicationsByUserId(id: number): Observable<any> {
    return this.http.get(`${apiUrl}/user/${id}`);
  }
  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${apiUrl}/all`);
  }
}
