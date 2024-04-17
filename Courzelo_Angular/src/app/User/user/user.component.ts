import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/Service/auth.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  email!: string;
  password!: string;
  errorMessage: string = ''; // Ajouté pour gérer les messages d'erreur

  constructor(private userService: UserService, private router: Router,private authService: AuthService) { }

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (user) => {
        console.log('Logged in user:', user);
        this.router.navigate(['/front']); // Rediriger vers '/front'
      },
      error: (error) => {
        console.error('Login failed:', error);
        this.errorMessage = 'Login failed. Please check your credentials.'; // Mise à jour du message d'erreur
      }
    });
  }
  

  onLogout() {
    this.authService.logout();
      next: (user: any) => {
    console.log('Logged out from user:', user);
    this.router.navigate(['/loginstatic']);
  }

}}
