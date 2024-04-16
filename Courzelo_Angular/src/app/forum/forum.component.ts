import { Component } from '@angular/core';
import { Publication } from '../models/Publication/pub';
import { PublicationService } from '../Service/Forum/Publication/publication.service';
import { Comment } from '../models/Comment/Comment';
import { ClassService } from '../Service/Course/Class/class.service';
import { Class, Level, Speciality } from '../models/Class/class';
import { LessonService } from '../Service/Course/Lesson/lesson.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lesson } from '../models/Lesson/lesson';

import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AddLessonAlerteComponent } from './add-lesson-alerte/add-lesson-alerte.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent {
  publications: Publication[] = [];
  newPublicationMessage: string = '';
  newComment: string = '';
  lessonForm: FormGroup <any>;
  lesson: any = { title:'' ,content: "",speciality:""  }; 
  uploadedFileUrl!: string;
  fileType!: string;
  speciality = Object.values(Speciality);
  level = Object.values(Level);
  classes?: Class[] ;
  currentClass?: Class;
  currentIndex = -1;

  constructor(private classervice: ClassService , private dialog: MatDialog, private http: HttpClient, private fb:FormBuilder,private publicationService: PublicationService, private classService : ClassService ,private lessonService:LessonService) { 
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(3)]],
      speciality: [Speciality.Informatique, Validators.required], // Définir la valeur par défaut
      level: [Level.LEVEL_1, Validators.required], // Définir la valeur par défau
    });
  }


  


openLessonForms(): void {
  const dialogRef = this.dialog.open(AddLessonAlerteComponent, {
    width: '600px',
    height: '650px',
  });

  dialogRef.afterClosed().subscribe(result => {
    // Traitez les données du formulaire ici si nécessaire
    console.log('Formulaire fermé avec le résultat :', result);
  });
}

 
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
    
 
  ngOnInit(): void {
    this.getPublications();
    this.retrieveAllClass();
  }

  // Récupérer les publications existantes
  getPublications(): void {
    this.publicationService.getAll().subscribe(publications => this.publications = publications);
  }
  publication?: any[] =[];
  retrieveAllPub(): void {
    this.publicationService.getAll()
      .subscribe(
        (data: Publication[]) => {
          this.publication = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
         
        
  }
 
  
  
  // Ajouter une nouvelle publication
  addPublication(): void {
    if (this.newPublicationMessage.trim()) {
      const newPublication: Publication = {
        message: this.newPublicationMessage,
        comments: []
      };
      this.publicationService.addModule(newPublication).subscribe(() => {
        this.getPublications(); // Rafraîchir la liste des publications après l'ajout
        this.newPublicationMessage = ''; // Effacer le champ de saisie après l'ajout
      });
    }
  }
  addComment(publication: Publication): void {
    if (this.newComment && this.newComment.trim()) { // Vérifiez si newComment est défini et non vide
      if (publication.idpub) { // Vérifiez si idpub est défini
        const newComment: Comment = {
          message: this.newComment,
          publicationId: publication.idpub
        };
        this.publicationService.addCommentToPublication(publication.idpub, newComment).subscribe(() => {
          this.getPublications();
          this.newComment = '';
        });
      } else {
        console.error('Publication id is undefined.'); // Gérer le cas où idpub est undefined
      }
    }
  }

  setActiveClass(c: Class, index: number): void {
    this.currentClass = c;
    this.currentIndex = index;
  }
  retrieveAllClass(): void {
    this.classervice.getAll()
      .subscribe(
        data => {
          this.classes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  deleteClass(idClass: string | undefined): void {
    if (idClass) {
      this.classervice.deleteClass(idClass).subscribe(
        () => {
          console.log(`Class with ID ${idClass} deleted successfully.`);
          // Update the class list or perform any necessary actions
          this.refreshClassList(); // Reload the updated class list
        },
        (error) => {
          console.error('Error deleting class:', error);
          // Handle error scenarios
        }
      );
    } else {
      console.error('Class ID is undefined. Cannot delete.');
    }
  }

  refreshClassList(): void {
    // Here, you should fetch the updated list of classes from your service
    // and update the local variable 'classes'
    this.classervice.getAll().subscribe(
      (updatedClasses: any[]) => {
        this.classes = updatedClasses;
      },
      (error) => {
        console.error('Error refreshing class list:', error);
        // Handle error scenarios
      }
    );
  
  
}
  }
  

