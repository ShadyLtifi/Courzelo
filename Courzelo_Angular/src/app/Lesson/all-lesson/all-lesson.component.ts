import { HttpErrorResponse } from '@angular/common/http';
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
  lessonObject: Lesson = {
  };
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
  this.lessonService.getAll().subscribe(
    (lessons: Lesson[]) => {
      this.lesson = lessons;

      this.lesson.forEach((lesson: Lesson) => {
        this.lessonService.getFileContent(lesson.content).subscribe(
          (fileContent: string) => {
            console.log('File Content:', fileContent);
          },
          (error) => {
            console.error('Error fetching file content:', error);
          }
        );
      });
    },
    (error) => {
      console.error('Error fetching lessons:', error);
    }
  );
}


downloadFile(content: string, fileName: string): void {
  const blob = new Blob([content], { type: this.getMimeType(this.getFileExtension(fileName)) });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);

  // Simuler un clic sur l'élément d'ancrage pour déclencher le téléchargement
  link.click();

  // Retirer l'élément d'ancrage du document
  document.body.removeChild(link);

  // Libérer l'URL de l'objet Blob
  window.URL.revokeObjectURL(url);
}


getMimeType(fileExtension: string | undefined): string {
  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'webp':
      return 'image/webp';
    case 'mp4':
      return 'video/mp4';
    case 'avi':
      return 'video/x-msvideo';
    case 'pdf':
      return 'application/pdf';
    case 'txt':
      return 'text/plain';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    // Ajoutez d'autres cas au besoin pour d'autres extensions de fichier
    default:
      return 'application/octet-stream';
  }
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
getFileContent(content: string): void {
  this.lessonService.getFileContent(content).subscribe(
    (fileContent: string) => {
      console.log('File Content:', fileContent);
      // Faites ce que vous voulez avec le contenu du fichier ici
    },
    (error) => {
      console.error('Error fetching file content:', error);
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
