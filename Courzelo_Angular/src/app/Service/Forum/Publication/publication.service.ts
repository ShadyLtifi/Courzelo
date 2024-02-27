import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publication } from 'src/app/models/Publication/pub';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallPublication`);
  }
  addModule(data: Publication): Observable<any> {
    return this.http.post(`${this.apiUrl}/addPublication`, data);
  }
}
