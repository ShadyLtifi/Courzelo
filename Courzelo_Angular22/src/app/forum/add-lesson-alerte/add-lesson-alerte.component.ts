import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/Service/Course/Lesson/lesson.service';
import { Class, Level, Speciality } from 'src/app/models/Class/class';

import { Lesson} from 'src/app/models/Lesson/lesson';

@Component({
  selector: 'app-add-lesson-alerte',
  templateUrl: './add-lesson-alerte.component.html',
  styleUrls: ['./add-lesson-alerte.component.css']
})
export class AddLessonAlerteComponent {
  speciality: Speciality[] = Object.values(Speciality);
level: Level[] = Object.values(Level);
lessonForm: FormGroup;

constructor(private lessonService: LessonService, private fb: FormBuilder) {
    this.lessonForm = this.fb.group({
        title: ['', Validators.required],
        speciality: [Speciality.Informatique, Validators.required], // Définir la valeur par défaut
        level: [Level.LEVEL_1, Validators.required], // Définir la valeur par défaut
        content: ['', Validators.required],
    });
}

closeAlert() {
  this.showAlert = false;
  console.log('Alerte fermée');
}
showAlert: boolean = false;

onSubmit() {
  if (this.lessonForm.valid) {
      const newLesson: Lesson = {
          title: this.lessonForm.get('title')?.value,
          content: this.lessonForm.get('content')?.value,
        };
      // Envoyer la leçon au service LessonService
      this.lessonService.addLessonBySpecialityAndLevel(
          this.lessonForm.get('speciality')?.value,
          this.lessonForm.get('level')?.value,
          newLesson
      ).subscribe(
          (data) => {
              console.log('Lesson added successfully:', data);
              // Rediriger ou afficher un message de succès
          },
          (error) => {
              console.error('An error occurred while adding the lesson:', error);
              // Afficher un message d'erreur à l'utilisateur
          }
      );
  } else {
      console.error('Invalid form:', this.lessonForm);
  }
}

onFileSelected(event: any) {
    const file = event.target.files[0];
    // Mettre à jour le contenu de la leçon avec le fichier
    // Pas besoin de mettre à jour le titre ici car il est déjà géré par le formulaire
    if (file) {
        // Envoyer le fichier au service LessonService
        this.lessonService.uploadFile(file, this.lessonForm.get('title')?.value).subscribe(
            (response) => {
                console.log('File uploaded successfully:', response);
                // Mettre à jour votre modèle avec les données renvoyées par le backend si nécessaire
            },
            (error) => {
                console.error('Error uploading file:', error);
            }
        );
    } else {
        console.error('No file selected.');
    }
}

  getFileType(file: File): string {
    const fileName = file.name.toLowerCase();
    if (fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.gif')) {
      return 'image';
    } else if (fileName.endsWith('.mp4') || fileName.endsWith('.avi')) {
      return 'video';
    } else if (fileName.endsWith('.pdf') || fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
      return 'document';
    } else {
      return 'other';
    }
  }
 
  
 
 
}
