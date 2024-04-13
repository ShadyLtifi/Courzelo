import { Component } from '@angular/core';
import { Class, Level } from '../models/Class/class';
import { Lesson, Speciality } from '../models/Lesson/lesson';
import { Module } from '../models/Module/module';
import { ModuleService } from '../Service/Course/Module/module.service';
import { LessonService } from '../Service/Course/Lesson/lesson.service';
import { ActivatedRoute } from '@angular/router';
import { Publication } from '../models/Publication/pub';
import { PublicationService } from '../Service/Forum/Publication/publication.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent {
  level  = Object.values(Level);
  // lesson: any = { title:'' ,content: "",speciality:""  }; 
  // specialit!: Speciality;
  // levels!: Level;
  selectedLevel!: Level;
  speciality: Speciality[] = Object.values(Speciality);
  selectedSpeciality!: Speciality;
  modules: Module[] = []; // Initialisez le tableau de modules
  moduleDetails: any;
  publications: Publication[] = [];
  newPublicationMessage: string = '';
  newComment: string = '';
  
  constructor(private moduleService: ModuleService,private route: ActivatedRoute ,private publicationService: PublicationService) { }
  getModules(): void {
    this.moduleService.getModulesBySpecialityAndLevel(this.selectedSpeciality, this.selectedLevel)
      .subscribe(modules => this.modules = modules);
  }  


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Moduleid = params.get('id');
      if (Moduleid !== null) {
        this.moduleService.retrieveModule(Moduleid).subscribe(
          (modDetails: any) => {
            this.moduleDetails = modDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
  addPublication(): void {
    if (this.newPublicationMessage.trim()) {
      const newPublication: Publication = {
        message: this.newPublicationMessage,
        comments: []
      };
      this.publicationService.addModule(newPublication).subscribe(() => {
        // Rafraîchir la liste des publications après l'ajout
        this.newPublicationMessage = ''; // Effacer le champ de saisie après l'ajout
      });
    }
  }
}
