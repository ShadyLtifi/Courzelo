import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/Service/Evaluation/question.service';
import { Question } from 'src/app/models/Evaluation/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allquestions',
  templateUrl: './allquestions.component.html',
  styleUrls: ['./allquestions.component.css']
})
export class AllquestionsComponent implements OnInit {
  questions: Question[] = [];

  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.questionService.getAllQuestions().subscribe(
      (data: Question[]) => {
        this.questions = data;
      },
      (error) => {
        console.error('Error loading questions', error);
      }
    );
  }

  deleteQuestion(question: Question): void {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (question.idquestion) {
          this.questionService.deleteQuestion(question.idquestion).subscribe(
            () => {
              console.log('Question deleted successfully.');
              this.loadQuestions(); // Recharger la liste des questions
              Swal.fire("Success !!", "Question deleted", 'success');
            },
            (error) => {
              console.log(error);
              Swal.fire("Error !!", "Error in deleting question", 'error');
            }
          );
        } else {
          console.log('Question ID is undefined');
        }
      }
    });
  }
}  