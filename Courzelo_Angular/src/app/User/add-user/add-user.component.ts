import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Service/user.service';
import { TypeRole, User } from 'src/app/models/User/user';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;
  user: any = { nom: '', prenom: "",CIN: "",  DateN: '', email: "",password: "" , username: '', Role: ""  }; 
  Role = Object.values(TypeRole);
 
  constructor(private fb:FormBuilder, private userService: UserService, private route: ActivatedRoute, private router:Router){
    this.userForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      CIN: ['', Validators.required],
      DateN: ['', Validators.required],
      email: ['', Validators.required],
      passwword: ['', Validators.required],
      username: ['', Validators.required],
      Role: ['', Validators.required],
    });

  }
  ngOnInit(): void {}

 
  onSubmit() {
    if (this.userForm.valid) {
      const newUser: User = {
        nom: this.userForm.get('nom')?.value,
        prenom: this.userForm.get('prenom')?.value,
        CIN: this.userForm.get('CIN')?.value,
        DateN: this.userForm.get('DateN')?.value,
        email: this.userForm.get('email')?.value,
        password: this.userForm.get('password')?.value,
        username: this.userForm.get('username')?.value,
        Role: this.userForm.get('Role')?.value,
      };
  
      if (newUser.nom !== null && newUser.prenom !== null && newUser.CIN !== null && newUser.DateN !== null && newUser.email !== null && newUser.password !== null && newUser.username !== null && newUser.Role !== null) {
        this.userService.adduser(newUser).subscribe(
          () => {
            console.log('User added successfully!');
            this.router.navigate(['/user']);
          },
          (error) => {
            console.error('Error adding user', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add user.');
      }
    } else {
      console.log('Form is invalid. Cannot add user.');
    }
}
}