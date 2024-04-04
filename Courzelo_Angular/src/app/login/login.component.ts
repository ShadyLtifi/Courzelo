import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../Service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private userService: UserService) { }

  login(username: string, password: string): void {
    this.userService.login(username, password).subscribe(response => {
        console.log('Logged in successfully:', response);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
