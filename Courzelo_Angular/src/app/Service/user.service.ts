import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RegisterDto } from '../models/Registerdto/registerDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:6085';
  private accessTokenKey = 'access_token';

  constructor(private http: HttpClient) { }

  registerUser(registerDto: RegisterDto): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/register`, registerDto);
  }

  login(username: string, password: string): Observable<any> {
    const loginRequest = { username, password }; 
    return this.http.post<any>(`${this.baseUrl}/auth/login`, loginRequest).pipe(
      tap(response => this.storeAccessToken(response.accessToken))
    );
  }

  private storeAccessToken(token: string): void {
    localStorage.setItem(this.accessTokenKey, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  removeAccessToken(): void {
    localStorage.removeItem(this.accessTokenKey);
  }
}
