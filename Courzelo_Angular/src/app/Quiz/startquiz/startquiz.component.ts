import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

import {LocationStrategy} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../../Service/Evaluation/question.service";
import Swal from "sweetalert2";
import { QuizService } from 'src/app/Service/Evaluation/quiz.service';

@Component({
  selector: 'app-startquiz',
  templateUrl: './startquiz.component.html',
  styleUrls: ['./startquiz.component.css']
})
export class StartquizComponent implements OnInit {
  qid:any;
  questions:any;
  marksGot=0;
  attempted=0;
  correctAnswers=0;
  isSubmit=false;
  timer:any;
  quiz: any; // Ajoutez cette ligne pour définir l'objet quiz
  currentQuestionIndex: number = 0; // L'index de la question actuelle
  isLastQuestion: boolean = false; 

  ngOnInit(): void {
    this.preventBackButton();
    this.qid=this._route.snapshot.params['qid'];
    this.loadQuestions();
  }
  constructor(private locationStrategy:LocationStrategy,
              private _route:ActivatedRoute,
              private questionService:QuestionService,
                private quizService : QuizService,
                private cdr: ChangeDetectorRef) {
  }
  preventBackButton()
  {
    history.pushState(null,'',location.href);
    this.locationStrategy.onPopState(()=>{
      history.pushState(null,'',location.href);
    });


  }

 // Supposons que quizService est un service qui peut récupérer les détails du quiz
private loadQuestions() {
  this.quizService.retrieveQuiz(this.qid).subscribe((quiz) => {
    this.quiz = quiz; // Assurez-vous que cette ligne est bien ici pour initialiser le quiz
    if (this.quiz && this.quiz.duration) {
      this.timer = this.quiz.duration * 60; // Convertir minutes en secondes
    }
    this.questionService.getQuestionsOfQuiz(this.qid).subscribe((data) => {
      this.questions = data;
      console.log("data of the quiz work", this.questions);

      this.questions.forEach((q: any) => {
        q['givenAnswer'] = '';
      });

      console.log(this.questions);
      this.startTimer();  // Commencez le timer ici

    }, error => {
      console.log(error);
      Swal.fire("Error !!", "Error in loading questions of quiz", 'error');
    });
  }, error => {
    console.log("Error loading quiz details", error);
    Swal.fire("Error !!", "Error in loading quiz details", 'error');
  });
}




  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',

      showCancelButton: true,
      confirmButtonText: 'Submit',

      icon:'info'
    }).then((e)=>{
      if(e.isConfirmed)
      {this.evalQuiz();
      }
    })
  }
  startTimer()
  {
    let t=window.setInterval(()=>{
      //code
      if(this.timer <= 0)
      {
        this.evalQuiz();
        clearInterval(t);
      }
      else {
        this.timer--;
      }
    },1000);
  }
  getFormattedTme()
  {
    let mm=Math.floor(this.timer/60);
    let ss = this.timer % 60;
    return `${mm} min : ${ss} sec`;
  }

  private evalQuiz() {
    const questionsWithAnswers = this.questions.map((question: any) => {
      return {
        idquestion: question.idquestion,
        givenAnswer: question.givenAnswer
      };
    });
    this.questionService.evalQuiz(this.qid,questionsWithAnswers).subscribe((data:any)=>{
      console.log(data);
      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2));
      this.correctAnswers=data.correctAnswer;
      this.attempted=data.attempted;
      this.isSubmit=true;


    },error => {
      console.log(error);

    });

  }

  printPage() {
    window.print();

  }
  // Dans votre composant TypeScript






  isQuestionAnswered(index: number): boolean {
    return this.questions[index].givenAnswer !== undefined && this.questions[index].givenAnswer !== '';
}

nextQuestion() {
  if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
  }
}

previousQuestion() {
  if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.isLastQuestion = false; // Assurez-vous de remettre à jour isLastQuestion
  }
}



}

