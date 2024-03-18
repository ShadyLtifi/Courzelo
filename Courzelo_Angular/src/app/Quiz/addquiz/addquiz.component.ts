import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/Service/Evaluation/quiz.service';
import { Quiz } from 'src/app/models/Evaluation/quiz';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.css']
})
export class AddquizComponent implements OnInit {
  quizForm: FormGroup;
  quiz: any = { description: '', duration: '', maxscore: '' }; 

  constructor(private fb: FormBuilder, private quizService: QuizService, private route: ActivatedRoute, private router: Router) {
    this.quizForm = this.fb.group({ 
      description: ['', Validators.required],
      duration: ['', Validators.required],
      maxScore: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.quizForm.valid) {
      const newQuiz: Quiz = {
        description: this.quizForm.get('description')?.value,
        duration: Number(this.quizForm.get('duration')?.value),
        maxScore: Number(this.quizForm.get('maxScore')?.value),
      };

      if (newQuiz.description !== null && newQuiz.duration !== null && newQuiz.maxScore !== null) {
        this.quizService.addQuiz(newQuiz).subscribe(
          () => {
            console.log('Quiz added successfully!');
            this.router.navigate(['/allquizzes']);
          },
          (error) => {
            console.error('Error adding Quiz', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add Quiz.');
      }
    } else {
      console.log('Form is invalid. Cannot add Quiz.');
    }
  }
  isFieldInvalid(field: string) {
    const control = this.quizForm.get(field);
    return control && control.touched && control.invalid;
  }
}
