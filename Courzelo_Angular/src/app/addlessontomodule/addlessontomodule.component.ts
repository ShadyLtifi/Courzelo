import { Component } from '@angular/core';
import { ModuleService } from '../Service/Course/Module/module.service';
import { Module } from '../models/Module/module';
import { Lesson } from '../models/Lesson/lesson';
import { LessonService } from '../Service/Course/Lesson/lesson.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-addlessontomodule',
  templateUrl: './addlessontomodule.component.html',
  styleUrls: ['./addlessontomodule.component.css']
})
export class AddlessontomoduleComponent {
  modules: Module[] = [];
  lessons: Lesson[] = [];
  selectedmoduleId: string | undefined;
  selectedLessonId: string | undefined;

  constructor(private lessonService: LessonService, private moduleService: ModuleService) { }

  ngOnInit(): void {
    this.loadModules();
    this.loadLessons();
  }

  loadModules(): void {
    this.moduleService.getAll().subscribe(
      (modules: Module[]) => {
        this.modules = modules;
        this.selectedmoduleId = this.modules.length > 0 ? this.modules[0].idmodule : undefined;
      },
      (error) => {
        console.error('Error fetching modules:', error);
      }
    );
  }

  loadLessons(): void {
    this.lessonService.getAll().subscribe(
      (lessons: Lesson[]) => {
        this.lessons = lessons;
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );
  }

  assignLessonToModule(): void {
    if (!this.selectedmoduleId || !this.selectedLessonId) {
      console.error('Please select both a module and a lesson.');
      return;
    }

    this.moduleService.addLessonToModule(this.selectedmoduleId, this.selectedLessonId).subscribe(
      (response) => {
        console.log('Response:', response);
        // Handle the response or update UI as needed
      },
      (error) => {
        console.error('Error assigning lesson to module:', error);
      }
    );
  }
}
