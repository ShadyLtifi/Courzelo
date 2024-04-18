import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/Service/Course/Class/class.service';
import { Class, Level, Speciality } from 'src/app/models/Class/class';


@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent {
  classForm: FormGroup;
  class: any = { capacity: '', level: "",progress: "",Speciality: "" }; 
  level = Object.values(Level);
  speciality = Object.values(Speciality);
  constructor(private fb:FormBuilder, private classService:ClassService, private route: ActivatedRoute, private router:Router){
    this.classForm = this.fb.group({
      capacity: ['', [Validators.required, Validators.minLength(3)]],
      level: ['', Validators.required],
      progress: ['', Validators.required],
      speciality: ['', Validators.required],
    });

  }
  ngOnInit(): void {}

 
  onSubmit() {
    if (this.classForm.valid) {
      const newClass: Class = {
        capacity: this.classForm.get('capacity')?.value,
        level: this.classForm.get('level')?.value,
        progress: this.classForm.get('progress')?.value,
        speciality: this.classForm.get('speciality')?.value,
      };
  
      if (newClass.capacity !== null && newClass.level !== null && newClass.progress !== null && newClass.speciality !== null) {
        this.classService.addClass(newClass).subscribe(
          () => {
            console.log('Class added successfully!');
            // Ajoutez ici la navigation ou d'autres actions après l'ajout réussi
            this.router.navigate(['/classe']);
          },
          (error) => {
            console.error('Error adding class', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add class.');
      }
    } else {
      console.log('Form is invalid. Cannot add class.');
    }
}

isFieldInvalid(field: string) {
  const control = this.classForm.get(field);
  return control && control.touched && control.invalid;
}
} 


