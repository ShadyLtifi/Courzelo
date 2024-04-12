import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RegisterDto } from '../models/Registerdto/registerDto';
import  {jwtDecode} from 'jwt-decode'; 
import { JwtService } from './jwt-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
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
        if (decodedToken && decodedToken.sub) {
          // Assuming roles are in an array format like '[ROLE_ADMIN]'
          const rolesString = decodedToken.sub;
          const rolesArray = rolesString.match(/\[(.*?)\]/);
          if (rolesArray && rolesArray.length > 1) {
            const roles = rolesArray[1].split(',');
            return roles.map((role: string) => role.trim());
          } else {
            console.error('Invalid roles format in token:', rolesString);
            return null;
          }
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
}
