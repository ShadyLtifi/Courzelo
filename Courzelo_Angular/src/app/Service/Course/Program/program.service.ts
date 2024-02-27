import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Program } from 'src/app/models/Program/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallProgram`);
  }
  addCourse(data: Program): Observable<any> {
    return this.http.post(`${this.apiUrl}/addProgram`, data);
  }
 
}
