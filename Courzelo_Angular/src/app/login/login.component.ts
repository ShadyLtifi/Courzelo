import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const credentials = { username: this.username, password: this.password };
    this.http.post('/auth/login', credentials).subscribe(
      (response: any) => {
        console.log('Logged in successfully:', response);
        // Redirect to 'front' page upon successful login
        this.router.navigate(['/front']);
      },
      (error) => {
        console.error('Login failed:', error);
        // Handle login error, e.g., display error message to the user
      }
    );
  }
}
