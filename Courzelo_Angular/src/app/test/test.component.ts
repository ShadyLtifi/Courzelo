import { Component } from '@angular/core';
import { LessonService } from '../Service/Course/Lesson/lesson.service';
import { Lesson } from '../models/Lesson/lesson';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Publication } from '../models/Publication/pub';
import { PublicationService } from '../Service/Forum/Publication/publication.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {
  pubForm: FormGroup <any>;
  publicaton: any = { message:'' ,datepub: "" }; 
  lesson?: any[] =[];
  currentLesson?: Lesson;
  currentIndex = -1;
  lessonForm: FormGroup <any>;
  uploadedFileUrl!: string;
  fileType!: string;
 
 
  constructor(private fb:FormBuilder,private lessonService: LessonService, private pubService:PublicationService, private route: ActivatedRoute, private router:Router){
    this.pubForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(3)]],

    });
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(3)]],
    
    });
  }
  ngOnInit(): void {}

  isFieldInvalid(field: string) {
    const control = this.pubForm.get(field);
    return control && control.touched && control.invalid;
  }
  onSubmit() {
    if (this.pubForm.valid) {
      const newPub: Publication = {
        message: this.pubForm.get('message')?.value,
        
       
      };
      
  
      if (newPub.message !== null ) {
        this.pubService.addModule(newPub).subscribe(
          () => {
            console.log('Publication added successfully!');
            // Ajoutez ici la navigation ou d'autres actions après l'ajout réussi
            this.router.navigate(['/allPublication']);
          },
          (error) => {
            console.error('Error adding Publication ', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add Publication.');
      }
    } else {
      console.log('Form is invalid. Cannot add Publication.');
    }
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    this.fileType = this.getFileType(file);
    this.uploadedFileUrl = URL.createObjectURL(file);
  
    // Récupérez le titre depuis le formulaire
    const title = this.lessonForm.get('title')?.value;
  
    // Appel au service d'upload pour envoyer le fichier au backend
    this.lessonService.uploadFile(file, title).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
        // Mettez à jour votre modèle avec les données renvoyées par le backend si nécessaire
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
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
