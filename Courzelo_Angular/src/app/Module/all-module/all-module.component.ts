import { Component } from '@angular/core';
import { ModuleService } from 'src/app/Service/Course/Module/module.service';
import { Module } from 'src/app/models/Module/module';

@Component({
  selector: 'app-all-module',
  templateUrl: './all-module.component.html',
  styleUrls: ['./all-module.component.css']
})
export class AllModuleComponent {
  module?: any[] =[];
  currentModule?: Module;
  currentIndex = -1;
  constructor(private moduleService: ModuleService) { }
  ngOnInit(): void {
    this.retrieveAllModule();
  }
  setActiveCourse(c: Module, index: number): void {
    this.currentModule = c;
    this.currentIndex = index;
  }
  retrieveAllModule(): void {
    this.moduleService.getAll()
      .subscribe(
        (data: Module[]) => {
          this.module = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
        
        
  }

}
