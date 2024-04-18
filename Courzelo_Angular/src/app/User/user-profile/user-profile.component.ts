import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/Service/jwt-service.service';
import { UserService } from 'src/app/Service/user.service';
import { Roles, User } from 'src/app/models/User/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  
  userProfile: User | undefined; 

  constructor(private userService: UserService, private jwtService: JwtService) {}

  ngOnInit(): void {
    const username = this.getUsernameFromToken();
    if (username) {
      this.getUserByUsername(username);
    } else {
      console.error('Username not found in token.');
    }
  }

  getUsernameFromToken(): string | null {
    const token = this.userService.getAccessToken();
    if (token) {
      const decodedToken: any = this.jwtService.decodeToken(token);
      return decodedToken ? decodedToken.username : null;
    }
    return null;
  }

  getUserByUsername(username: string): void {
    this.userService.getUserByUsername(username).subscribe(
      (user: User) => {
        this.userProfile = user; 
      },
      (error: any) => {
        console.error('Error fetching user data:', error);
      }
    );
  }
}