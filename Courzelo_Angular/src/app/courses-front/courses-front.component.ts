import { Component } from '@angular/core';
import { Level } from '../models/Class/class';
import { Speciality } from '../models/Lesson/lesson';
import { Module } from '../models/Module/module';
import { ModuleService } from '../Service/Course/Module/module.service';

@Component({
  selector: 'app-courses-front',
  templateUrl: './courses-front.component.html',
  styleUrls: ['./courses-front.component.css']
})
export class CoursesFrontComponent {
  level  = Object.values(Level);
  // lesson: any = { title:'' ,content: "",speciality:""  }; 
  // specialit!: Speciality;
  // levels!: Level;
  selectedLevel!: Level;
  speciality: Speciality[] = Object.values(Speciality);
  selectedSpeciality!: Speciality;
  modules: Module[] = []; // Initialisez le tableau de modules
  constructor(private moduleService: ModuleService) { }
  getModules(): void {
    this.moduleService.getModulesBySpecialityAndLevel(this.selectedSpeciality, this.selectedLevel)
      .subscribe(modules => this.modules = modules);
  }
  showAlert() {
    alert('Vous avez cliqué sur le bouton!');
  }  
}
