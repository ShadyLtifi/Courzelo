import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Question } from 'src/app/models/Evaluation/question';

// Define an interface for the data object
interface DialogData {
  message: string;
  questions: Question[];
}

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class ConfirmationDialogComponent {
  selectedQuestions: { [key: string]: boolean } = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {
    // Initialize 'checked' property for each question
    this.data.questions.forEach(question => this.selectedQuestions[question.idquestion || ''] = false);
  }

  toggleSelection(question: Question): void {
    if (question.idquestion !== undefined) {
      this.selectedQuestions[question.idquestion] = !this.selectedQuestions[question.idquestion];
    }
  }

  confirmSelection(): void {
    const selectedQuestions = this.data.questions.filter(question =>
      question.idquestion !== undefined && this.selectedQuestions[question.idquestion]
    );
    this.dialogRef.close(selectedQuestions);
  }
}
