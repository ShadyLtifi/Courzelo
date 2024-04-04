import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { RegisterDto } from 'src/app/models/Registerdto/registerDto';
import { TypeRole, User } from 'src/app/models/User/user';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;
  Role = Object.values(TypeRole);
 
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      cin: ['', Validators.required],
      DateN: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      Role: ['', Validators.required],
      password: ['', Validators.required],
     
    });
  }
  onSubmit() {
    if (this.userForm.valid) {
      const registerDto: RegisterDto = new RegisterDto(
        this.userForm.get('nom')!.value,
        this.userForm.get('prenom')!.value,
        this.userForm.get('cin')!.value,
        this.userForm.get('DateN')!.value,
        this.userForm.get('username')!.value,
        this.userForm.get('email')!.value,
        this.userForm.get('Role')!.value,
        this.userForm.get('password')!.value
      );
      this.userService.registerUser(registerDto).subscribe(
        () => {  
        console.log('User registered successfully!');
           },
        error => {
          console.error('Error registering user:', error);
        }
      );
    } else {
      console.log('Form is invalid. Cannot register user.');
    }
  }}