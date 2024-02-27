import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/models/Comment/Comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:6085';
  constructor(private http: HttpClient) { }
  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/retrieveallcomments`);
  }
  addComment(data: Comment): Observable<any> {
    return this.http.post(`${this.apiUrl}/addComment`, data);
  }
}
