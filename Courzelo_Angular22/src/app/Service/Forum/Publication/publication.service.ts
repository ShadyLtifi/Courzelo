import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/Comment/Comment';
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
  DeletePublication(idPublication: string): Observable<void> {
    const url = `${this.apiUrl}/DeletePublication/${idPublication}`;
    return this.http.delete<void>(url);
  }

  updatePublication(idPublication: any, updatePublication: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updatePublication/${idPublication}`, updatePublication);
  }
  retrievePublication(Publicationid: string): Observable<Publication> {
    const url = `${this.apiUrl}/retrievePublication/${Publicationid}`;
    return this.http.get<Publication>(url);
  }
  addCommentToPublication(publicationId: string, comment: Comment): Observable<Comment> {
    const url = `${this.apiUrl}/add/${publicationId}`;
    return this.http.post<Comment>(url, comment);
  }
}
