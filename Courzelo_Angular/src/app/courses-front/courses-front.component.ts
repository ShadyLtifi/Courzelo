import { Component } from '@angular/core';
import { Level } from '../models/Class/class';
import { Speciality } from '../models/Lesson/lesson';
import { Module } from '../models/Module/module';
import { ModuleService } from '../Service/Course/Module/module.service';
import { ActivatedRoute } from '@angular/router';

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
  moduleDetails: any;
  constructor(private moduleService: ModuleService, private route: ActivatedRoute) { }
  getModules(): void {
    this.moduleService.getModulesBySpecialityAndLevel(this.selectedSpeciality, this.selectedLevel)
      .subscribe(modules => this.modules = modules);
  }
  showAlert() {
    alert('Vous avez cliqué sur le bouton!');
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
}
