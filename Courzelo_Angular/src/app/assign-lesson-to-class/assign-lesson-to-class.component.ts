import { Component, OnInit } from '@angular/core';
import { LessonService } from 'src/app/Service/Course/Lesson/lesson.service';
import { Lesson } from 'src/app/models/Lesson/lesson';
import { Class } from 'src/app/models/Class/class';
import { HttpErrorResponse } from '@angular/common/http';
import { ClassService } from '../Service/Course/Class/class.service';

@Component({
  selector: 'app-assign-lesson-to-class',
  templateUrl: './assign-lesson-to-class.component.html',
  styleUrls: ['./assign-lesson-to-class.component.css']
})
export class AssignLessonToClassComponent implements OnInit {
  classes: Class[] = [];
  lessons: Lesson[] = [];
  selectedClassId: string | undefined;
  selectedLesson: Lesson | undefined;

  constructor(private lessonService: LessonService, private classService: ClassService) { }

  ngOnInit(): void {
    this.loadClasses();
    this.loadLessons();
  }

  loadClasses(): void {
    this.classService.getAll().subscribe(
      (classes: Class[]) => {
        this.classes = classes;
      },
      (error) => {
        console.error('Error fetching classes:', error);
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

  assignLessonToClass(): void {
    if (!this.selectedClassId || !this.selectedLesson) {
      console.error('Please select both a class and a lesson.');
      return;
    }

    this.lessonService.addLessonToClass(this.selectedClassId, this.selectedLesson).subscribe(
      (response) => {
        if (response instanceof HttpErrorResponse) {
          console.error('Error assigning lesson to class:', response.error);
          // Handle error scenarios if needed
        } else {
          console.log('Lesson assigned to class successfully:', response); // Log the entire response
          // Optionally, you can update the UI or perform other actions after successful assignment
        }
      },
      (error) => {
        console.error('Error assigning lesson to class:', error);
      }
    );
  }
}
