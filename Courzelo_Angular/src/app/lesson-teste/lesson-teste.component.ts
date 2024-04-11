import { Component } from '@angular/core';
import { Speciality, Lesson } from '../models/Lesson/lesson';
import { LessonService } from '../Service/Course/Lesson/lesson.service';
import { Level } from '../models/Class/class';

@Component({
  selector: 'app-lesson-teste',
  templateUrl: './lesson-teste.component.html',
  styleUrls: ['./lesson-teste.component.css']
})
export class LessonTesteComponent {
  // speciality = Object.values(Speciality);
  // level = Object.values(Level);
  // lesson: any = { title:'' ,content: "",speciality:""  }; 
  // specialit!: Speciality;
  // levels!: Level;

  speciality: Speciality[] = Object.values(Speciality);
  level: Level[] = Object.values(Level);
  lesson: Lesson = { title: '', content: '', speciality: Speciality.Informatique }; 
  selectedSpeciality: Speciality = Speciality.Informatique;
  selectedLevel: Level = Level.LEVEL_1;

  constructor(private lessonService: LessonService) { }
  onSubmit() {
    if (this.lesson.speciality) { // Vérifiez si this.lesson.speciality est défini et non nul
      this.selectedSpeciality = this.lesson.speciality; // Utilisez this.lesson.speciality car il est défini et valide
      this.lessonService.addLessonBySpecialityAndLevel(this.selectedSpeciality, this.selectedLevel, this.lesson)
        .subscribe(
          (data) => {
            console.log('Lesson added successfully:', data);
            // Ajoutez ici le code pour rediriger ou afficher un message de succès
          },
          (error) => {
            console.error('An error occurred while adding the lesson:', error);
            // Ajoutez ici le code pour afficher un message d'erreur à l'utilisateur
          }
        );
    } else {
      console.error('Invalid speciality:', this.lesson.speciality);
      // Ajoutez ici le code pour afficher un message d'erreur à l'utilisateur
    }
  }
  
}
