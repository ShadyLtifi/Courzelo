import { Component } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/models/User/user';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrls: ['./alluser.component.css']
})
export class AlluserComponent {
  Users?: User[] ;
  constructor(private userService: UserService) { }
  ngOnInit(): void {
    this.retrieveAllUser();

  }

  retrieveAllUser(): void {
    this.userService.getAll()
      .subscribe(
        data => {
          this.Users = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(username: string | undefined): void {
    if (username) {
      this.userService.deleteUser(username).subscribe(
        () => {
          console.log(`User with ID ${username} deleted successfully.`);
          this.refreshClassList(); 
        },
        (error) => {
          console.error('Error deleting class:', error);
        }
      );
    } else {
      console.error('User ID is undefined. Cannot delete.');
    }
  }

  refreshClassList(): void {
    this.userService.getAll().subscribe(
      (updatedUsers: any[]) => {
        this.Users = updatedUsers;
      },
      (error) => {
        console.error('Error refreshing class list:', error);
      }
    );
  
  
}

}