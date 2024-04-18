import { Component } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent {
  email: string = '';
  oldPass: string = '';
  newPass: string = '';
  successMessage: string = '';
  errorMessage: string = '';


  constructor(private userService: UserService) { }


  changePassword(): void {
    this.userService.changePassword(this.email, this.oldPass, this.newPass)
      .subscribe(
        () => {
          this.successMessage = 'Password changed successfully.';
          this.errorMessage = '';
        },
        (error) => {
          this.errorMessage = 'Failed to change password. ' + error.message;
          this.successMessage = '';
        }
      );
  }
}
