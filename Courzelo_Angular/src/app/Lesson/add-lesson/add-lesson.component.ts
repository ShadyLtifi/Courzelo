import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from 'src/app/Service/Course/Lesson/lesson.service';
import { Lesson } from 'src/app/models/Lesson/lesson';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.css']
})
export class AddLessonComponent {
  lessonForm: FormGroup <any>;
  lesson: any = { title:'' ,content: "" }; 
  
 
  constructor(private fb:FormBuilder, private lessonService:LessonService, private route: ActivatedRoute, private router:Router){
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(3)]],
    
    });

  }
  ngOnInit(): void {}

 
  onSubmit() {
    if (this.lessonForm.valid) {
      const newLesson: Lesson = {
        title: this.lessonForm.get('title')?.value,
        content: this.lessonForm.get('content')?.value,
        
       
      };
      
  
      if (newLesson.title !== null && newLesson.content !== null ) {
        this.lessonService.addLesson(newLesson).subscribe(
          () => {
            console.log('Lesson added successfully!');
            // Ajoutez ici la navigation ou d'autres actions après l'ajout réussi
            this.router.navigate(['/allLesson']);
          },
          (error) => {
            console.error('Error adding Lesson ', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add Lesson.');
      }
    } else {
      console.log('Form is invalid. Cannot add Lesson.');
    }
  }
}
