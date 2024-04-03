import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/user.service';
import { User } from '../models/User/user';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css']
})
export class BackComponent implements OnInit {
  users: User[] = []; 
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    
  }
}

