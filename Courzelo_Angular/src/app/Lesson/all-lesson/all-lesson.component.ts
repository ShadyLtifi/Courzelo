import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
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
 // ...

// retrieveAllLesson(): void {
//   this.lessonService.getAll().subscribe(
//     (data: Lesson[]) => {
//       this.lesson = data;

//       // Check if 'lesson' is not undefined and has elements
//       if (this.lesson && this.lesson.length > 0) {

//         // Create an array of observables for each file content request
//         const contentRequests = this.lesson.map((lesson: any) =>
//           this.lessonService.getFileContent(lesson.content)
//         );

//         // Use forkJoin to wait for all observables to complete
//         forkJoin(contentRequests).subscribe(
//           (contents: string[]) => {
//             // Update each lesson with its corresponding content
//             if (this.lesson) {
//               this.lesson.forEach((lesson, index) => {
//                 // Check if 'contents' is not undefined
//                 if (contents && contents[index] !== undefined) {
//                   lesson.content = contents[index];
//                 }
//               });
//             }
//           },
//           (error) => {
//             console.error('Error fetching file content:', error);
//           }
//         );
//       }
//     },
//     (error) => {
//       console.log(error);
//     }
//   );
// }

// all-lesson.component.ts
retrieveAllLesson(): void {
  this.lessonService.getAll().subscribe(
    (data: Lesson[]) => {
      console.log('Lesson data from backend:', data);
      this.lesson = data;

      // Récupérer le contenu de chaque fichier
      const contentRequests = this.lesson.map((lesson: any) =>
        this.lessonService.getFileContent(lesson.content)
      );

      forkJoin(contentRequests).subscribe(
        (contents: string[]) => {
          // Update each lesson with its corresponding content
          if (this.lesson) {
            this.lesson.forEach((lesson, index) => {
              // Check if 'contents' is not undefined
              if (contents && contents[index] !== undefined) {
                lesson.content = contents[index];
              }
            });
          }
        },
        (error) => {
          console.error('Error fetching file content:', error);
        }
      );
    },
    (error) => {
      console.log(error);
    }
  );
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
getFileExtension(fileName: string): string {
  return fileName.split('.').pop()?.toLowerCase() || '';
}

isImage(content: Lesson): boolean {
  const extension = this.getFileExtension(content.content);
  return extension === 'jpg' || extension === 'png' || extension === 'gif' || extension === 'webp';
}

isVideo(content: Lesson): boolean {
  const extension = this.getFileExtension(content.content);
  return extension === 'mp4' || extension === 'avi';
}

isDocument(content: Lesson): boolean {
  const extension = this.getFileExtension(content.content);
  return extension === 'pdf' || extension === 'txt' || extension === 'docx';
}

isSupported(content: Lesson): boolean {
  const extension = this.getFileExtension(content.content);
  return this.isImage(content) || this.isVideo(content) || this.isDocument(content);
}


}
