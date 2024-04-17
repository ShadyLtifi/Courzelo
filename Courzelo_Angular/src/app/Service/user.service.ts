import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RegisterDto } from '../models/Registerdto/registerDto';
import { JwtService } from './jwt-service.service';
import * as jwt_decode from 'jwt-decode';
import { User } from '../models/User/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  getUserByUsername(username: string): Observable <User> {
    return this.http.get<any>(`${this.baseUrl}/findUserByUsername/${username}`);
  }
  private baseUrl = 'http://localhost:6085';
  private accessTokenKey = 'access_token';

  constructor(private http: HttpClient, private jwtService: JwtService ) { }
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
  
  getUserRoles(): string[] | null {
    const accessToken = this.getAccessToken();
    if (accessToken) {
      try {
        const decodedToken: any = this.jwtService.decodeToken(accessToken);
        if (decodedToken && decodedToken.role) {
          return decodedToken.role;
        } else {
          console.error('Invalid token or missing roles:', decodedToken);
          return null;
        }
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

  getCurrentUserProfile(): Observable<any> {
    const token = localStorage.getItem(this.accessTokenKey);
    const decodedToken: any = jwt_decode.jwtDecode(token || ''); // Decode the token
    const username = decodedToken ? decodedToken.username : ''; // Extract username from decoded token
    return this.http.get<any>(`${this.baseUrl}/findUserByUsername/${username}`);
  }  

  changePassword(email: string, oldPass: string, newPass: string): Observable<any> {
    const request = { email, oldPass,  newPass };
    return this.http.put(`${this.baseUrl}/change-password`, request, { responseType: 'text' });
  }

  getAll() : Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/allusers`);
  }

  deleteUser(username: string): Observable<void> {
    const url = `${this.baseUrl}/deleteuser/${username}`;
    return this.http.delete<void>(url);
  }

  updateUser(username: string, updatedUser: any): Observable<any> {
    const url = `${this.baseUrl}/updateUser/${username}`;
    return this.http.put(url, updatedUser).pipe(
      catchError((error: any) => {
        console.error('Error updating user:', error);
        throw error; 
      })
    );
  }

  retrieveUser(username: string): Observable<User> {
    const url = `${this.baseUrl}/findUserByUsername/${username}`;
    return this.http.get<User>(url);
  }
}
