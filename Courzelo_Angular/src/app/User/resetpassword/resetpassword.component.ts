import { Component } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private userService: UserService,private router:Router) { }


  changePassword(): void {
    this.userService.changePassword(this.email, this.oldPass, this.newPass)
      .subscribe(
        () => {
          this.successMessage = 'Password changed successfully.';
          this.errorMessage = '';
          this.router.navigate(['/user'])
        },
        (error) => {
          this.errorMessage = 'Failed to change password. ' + error.message;
          this.successMessage = '';
        }
      );
  }
}
