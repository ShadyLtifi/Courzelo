import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { User } from 'src/app/models/User/user';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent {
  updateForm: FormGroup;
  updatedUser: any = { nom: '', prenom: '', email: ''};

  users?: User[] ;
  constructor(private fb: FormBuilder, private userService: UserService, private route: ActivatedRoute,  private router:Router) {
    this.updateForm = this.fb.group({
      
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', Validators.required],

    });
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const username = params.get('username');
      if (username !== null) {
        this.userService.retrieveUser(username).subscribe(
        (userDetails: any) => {
          this.updatedUser = userDetails;
          this.updateForm.patchValue(userDetails); 
        },
        error => {
          console.log(error);
        }
      );
  }});
  }
  


  updateUser() {
    console.log('Before Update - Updated User:', this.updatedUser);
  
    const nomControl = this.updateForm.get('nom');
    const prenomControl = this.updateForm.get('prenom');
    const emailControl = this.updateForm.get('email');
  
    if (nomControl && prenomControl && emailControl ) {
      this.updatedUser.nom = nomControl.value;
      this.updatedUser.prenom = prenomControl.value;
      this.updatedUser.email = emailControl.value;
  
      const username = this.updatedUser.username;
  
      this.userService.updateUser(username, this.updatedUser).subscribe(
        (response) => {
          console.log('Class updated successfully:', response);
            this.updatedUser = response;
          console.log('After Update - Updated User:', this.updatedUser);
          this.router.navigate(['/alluser']);
        },
        (error) => {
          console.error('Error updating class:', error);
        }
      );
    } else {
      console.error('Form controls are null.');
    }
  }


  refreshClassList(): void {
    this.userService.getAll().subscribe(
      (updatedUsers: any[]) => {
        this.users = updatedUsers;
      },
      (error) => {
        console.error('Error refreshing class list:', error);
      }
    );
  
  
}
  }