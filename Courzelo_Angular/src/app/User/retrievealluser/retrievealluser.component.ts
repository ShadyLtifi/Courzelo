import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/models/User/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './retrievealluser.component.html',
  styleUrls: ['./retrievealluser.component.css']
})
export class RetrievealluserComponent{
  users: User[] = []; // Define the 'user' property here

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }
}