import { Component } from '@angular/core';
import { CourseService } from 'src/app/Service/Course/Course/course.service';
import { Course } from 'src/app/models/Course/Course';

@Component({
  selector: 'app-all-course',
  templateUrl: './all-course.component.html',
  styleUrls: ['./all-course.component.css']
})
export class AllCourseComponent {
  courses?: any[] =[];
  currentCourse?: Course;
  currentIndex = -1;
  constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    this.retrieveAllCourse();
  }
  setActiveCourse(c: Course, index: number): void {
    this.currentCourse = c;
    this.currentIndex = index;
  }
  retrieveAllCourse(): void {
    this.courseService.getAll()
      .subscribe(
        (data: Course[]) => {
          this.courses = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
        
        
  }
}
