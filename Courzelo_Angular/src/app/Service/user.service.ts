// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDto } from '../models/Registerdto/registerDto';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:6085/auth/register';

  constructor(private http: HttpClient) { }

  registerUser(registerDto: RegisterDto): Observable<any> {
    return this.http.post<any>(this.baseUrl, registerDto);
  }
}
