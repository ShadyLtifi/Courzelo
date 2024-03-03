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

  deleteLesson(idlesson: string | undefined): void {
    if (idlesson) {
      this.lessonService.deleteLesson(idlesson).subscribe(
        () => {
          console.log(`Class with ID ${idlesson} deleted successfully.`);
          // Update the class list or perform any necessary actions
          this.refreshLessonList(); // Reload the updated class list
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

  refreshLessonList(): void {
    // Here, you should fetch the updated list of classes from your service
    // and update the local variable 'classes'
    this.lessonService.getAll().subscribe(
      (updatedLessons: any[]) => {
        this.lesson = updatedLessons;
      },
      (error) => {
        console.error('Error refreshing class list:', error);
        // Handle error scenarios
      }
    );
  
  
}
}
