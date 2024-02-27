import { Component } from '@angular/core';
import { LessonService } from 'src/app/Service/Course/Lesson/lesson.service';
import { Lesson } from 'src/app/models/Lesson/lesson';

@Component({
  selector: 'app-all-lesson',
  templateUrl: './all-lesson.component.html',
  styleUrls: ['./all-lesson.component.css']
})
export class AllLessonComponent {
  lesson?: any[] =[];
  currentLesson?: Lesson;
  currentIndex = -1;
  constructor(private lessonService: LessonService) { }
  ngOnInit(): void {
    this.retrieveAllLesson();
  }
  setActiveCourse(c: Lesson, index: number): void {
    this.currentLesson = c;
    this.currentIndex = index;
  }
  retrieveAllLesson(): void {
    this.lessonService.getAll()
      .subscribe(
        (data: Lesson[]) => {
          this.lesson = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
        
        
  }
}
