import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Level } from 'src/app/models/Class/class';
import { Lesson, Speciality } from 'src/app/models/Lesson/lesson';

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


  uploadFile(file: File, title: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
  
    return this.http.post<any>(`${this.apiUrl}/uploadFile`, formData);
  }
  
  getFiles(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/getFiles`);
  }
  getFilesWithInfo(): Observable<Lesson[]> {
    return this.http.get<Lesson[]>(`${this.apiUrl}/getFilesWithInfo`);
  }
  // getFileContent(content: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/getFileContent/${content}`);
  // }
  // getFileContent(content: string): Observable<string> {
  //   const url = `${this.apiUrl}/content/${content}`;
  //   return this.http.get<string>(url);
  // }
  getFileContent(content: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/content/${content}`).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching file content:', error);
        return throwError('Something went wrong while fetching file content');
      })
    );
  }
  public getApiUrl(): string {
    return this.apiUrl;
  }

getFileContentAsArrayBuffer(content: string): Observable<ArrayBuffer> {
  return this.http.get(`${this.apiUrl}/content/${content}`, { responseType: 'arraybuffer' });
}

getFileContentAsString(content: string): Observable<string> {
  return this.http.get(`${this.apiUrl}/content/${content}`, { responseType: 'text' });
}
addLessonBySpecialityAndLevel(speciality: Speciality, level: Level, lesson: Lesson): Observable<Lesson> {
  const url = `${this.apiUrl}/addLessonBySpecialityAndLevel?speciality=${speciality}&level=${level}`;
  return this.http.post<Lesson>(url, lesson, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }).pipe(
    catchError(this.handleError)
  );
}

private handleError(error: any) {
  console.error('An error occurred:', error);
  return throwError(error);
}

getLessonOfClassByLevelAndSpeciality(level: Level, speciality: Speciality): Observable<Lesson[]> {
  return this.http.get<Lesson[]>(`${this.apiUrl}/class/${level}/${speciality}`);
}

}
