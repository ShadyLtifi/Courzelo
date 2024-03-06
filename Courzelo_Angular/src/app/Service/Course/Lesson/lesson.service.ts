import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lesson } from 'src/app/models/Lesson/lesson';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallLesson`);
  }
  addLesson(data: Lesson): Observable<any> {
    return this.http.post(`${this.apiUrl}/addLesson`, data);
  }
  deleteLesson(idlesson: string): Observable<void> {
    const url = `${this.apiUrl}/DeleteLesson/${idlesson}`;
    return this.http.delete<void>(url);
  }

  updateLesson(idlesson: any, updateLesson: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateLesson/${idlesson}`, updateLesson);
  }
  retrieveLesson(Lessonid: string): Observable<Lesson> {
    const url = `${this.apiUrl}/retrieveLesson/${Lessonid}`;
    return this.http.get<Lesson>(url);
  }
}
