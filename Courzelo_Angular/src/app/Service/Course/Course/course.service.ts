import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/Course/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallCourse`);
  }
  addCourse(data: Course): Observable<any> {
    return this.http.post(`${this.apiUrl}/addCourse`, data);
  }
}
