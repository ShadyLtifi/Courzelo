import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Module } from 'src/app/models/Module/module';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallModule`);
  }
  addModule(data: Module): Observable<any> {
    return this.http.post(`${this.apiUrl}/addModule`, data);
  }
 
}
