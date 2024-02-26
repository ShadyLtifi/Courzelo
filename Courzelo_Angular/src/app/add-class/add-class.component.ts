import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClassService } from '../Service/Course/Class/class.service';
import { Router } from '@angular/router';
import { Class } from '../models/Class/class';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css']
})
export class AddClassComponent implements OnInit {
  classForm: FormGroup;
  constructor(private fb:FormBuilder, private classService:ClassService, private router:Router){
    this.classForm = this.fb.group({
      capacity: ['', [Validators.required, Validators.minLength(3)]],
      level: ['', Validators.required],
      progress: ['', Validators.required],
    });

  }
  ngOnInit(): void {}

 
  addClass() {
    if (this.classForm.valid) {
      const newClass = this.classForm.value;

      this.classService.addClass(newClass).subscribe(
        (response) => {
          // Traitez la réponse du backend si nécessaire
          console.log('Classe ajoutée avec succès!', response);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de la classe', error);
        }
      );
    }
  }

}
