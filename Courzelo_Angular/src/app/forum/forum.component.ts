import { Component } from '@angular/core';
import { Publication } from '../models/Publication/pub';
import { PublicationService } from '../Service/Forum/Publication/publication.service';
import { Comment } from '../models/Comment/Comment';
import { ClassService } from '../Service/Course/Class/class.service';
import { Level, Speciality } from '../models/Class/class';
import { LessonService } from '../Service/Course/Lesson/lesson.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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
  level = Object.values(Speciality);
 

  constructor(private fb:FormBuilder,private publicationService: PublicationService, private classService : ClassService ,private lessonService:LessonService) { 
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(3)]],
    
    });
  }

  ngOnInit(): void {
    this.getPublications();
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

 
  }
  

