import { Component } from '@angular/core';

import { Level, Speciality } from '../models/Class/class';
import { Module } from '../models/Module/module';
import { ModuleService } from '../Service/Course/Module/module.service';

@Component({
  selector: 'app-lesson-teste',
  templateUrl: './lesson-teste.component.html',
  styleUrls: ['./lesson-teste.component.css']
})
export class LessonTesteComponent {
  // speciality = Object.values(Speciality);
 level  = Object.values(Level);
  // lesson: any = { title:'' ,content: "",speciality:""  }; 
  // specialit!: Speciality;
  // levels!: Level;
  selectedLevel!: Level;
  speciality: Speciality[] = Object.values(Speciality);
  selectedSpeciality!: Speciality;
  modules: Module[] = []; // Initialisez le tableau de modules

  constructor(private moduleService: ModuleService) { }

  ngOnInit(): void {
    // Chargez les modules initiaux (par exemple, 'Informatique' peut être une spécialité par défaut)
    this.loadModules();
  }
  serviceWorking: boolean = true; 
  loadModules(): void {
    this.moduleService.getModulesBySpeciality(this.selectedSpeciality)
      .subscribe(
        modules => {
          this.modules = modules;
        },
        error => {
          console.error('Une erreur s\'est produite lors de la récupération des modules : ', error);
          // Afficher un message d'erreur à l'utilisateur
        }
      );
  }
  getModules(): void {
    this.moduleService.getModulesBySpecialityAndLevel(this.selectedSpeciality, this.selectedLevel)
      .subscribe(modules => this.modules = modules);
  }  
  }
  

