import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and FormGroup
import { MatDialog } from '@angular/material/dialog';
import { Question } from 'src/app/models/Evaluation/question';
import { ConfirmationDialogComponent } from 'src/app/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-addquiz',
  templateUrl: './addquiz.component.html',
  styleUrls: ['./addquiz.component.css']
})
export class AddquizComponent {
  quizForm: FormGroup; // Define quizForm as a FormGroup
  questions: Question[] = []; // Assuming you have a way to populate questions
  selectedQuestions: { [key: string]: boolean } = {};

  constructor(
    private fb: FormBuilder, // Inject FormBuilder
    private dialog: MatDialog
  ) {
    this.quizForm = this.fb.group({
      description: ['', Validators.required],
      duration: ['', Validators.required],
      maxScore: ['', Validators.required],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        message: 'Select questions to add:',
        questions: this.questions
      }
    });

    dialogRef.afterClosed().subscribe(selectedQuestions => {
      if (selectedQuestions) {
        console.log('Selected questions:', selectedQuestions);
        // Update selectedQuestions or perform any other action
        this.selectedQuestions = selectedQuestions.reduce((acc: { [key: string]: boolean }, question: Question) => {
          if (question.idquestion !== undefined) {
            acc[question.idquestion] = true;
          }
          return acc;
        }, {});
      }
    });
  }

  saveQuiz(): void {
    // Your save logic here
  }
}
