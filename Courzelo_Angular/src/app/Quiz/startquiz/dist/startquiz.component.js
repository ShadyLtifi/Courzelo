"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StartquizComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var StartquizComponent = /** @class */ (function () {
    function StartquizComponent(locationStrategy, _route, questionService, quizService, cdr) {
        this.locationStrategy = locationStrategy;
        this._route = _route;
        this.questionService = questionService;
        this.quizService = quizService;
        this.cdr = cdr;
        this.marksGot = 0;
        this.attempted = 0;
        this.correctAnswers = 0;
        this.isSubmit = false;
        this.currentQuestionIndex = 0; // L'index de la question actuelle
        this.isLastQuestion = false;
    }
    StartquizComponent.prototype.ngOnInit = function () {
        this.preventBackButton();
        this.qid = this._route.snapshot.params['qid'];
        this.loadQuestions();
    };
    StartquizComponent.prototype.preventBackButton = function () {
        history.pushState(null, '', location.href);
        this.locationStrategy.onPopState(function () {
            history.pushState(null, '', location.href);
        });
    };
    // Supposons que quizService est un service qui peut récupérer les détails du quiz
    StartquizComponent.prototype.loadQuestions = function () {
        var _this = this;
        this.quizService.retrieveQuiz(this.qid).subscribe(function (quiz) {
            _this.quiz = quiz; // Assurez-vous que cette ligne est bien ici pour initialiser le quiz
            if (_this.quiz && _this.quiz.duration) {
                _this.timer = _this.quiz.duration * 60; // Convertir minutes en secondes
            }
            _this.questionService.getQuestionsOfQuiz(_this.qid).subscribe(function (data) {
                _this.questions = data;
                console.log("data of the quiz work", _this.questions);
                _this.questions.forEach(function (q) {
                    q['givenAnswer'] = '';
                });
                console.log(_this.questions);
                _this.startTimer(); // Commencez le timer ici
            }, function (error) {
                console.log(error);
                sweetalert2_1["default"].fire("Error !!", "Error in loading questions of quiz", 'error');
            });
        }, function (error) {
            console.log("Error loading quiz details", error);
            sweetalert2_1["default"].fire("Error !!", "Error in loading quiz details", 'error');
        });
    };
    StartquizComponent.prototype.submitQuiz = function () {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Do you want to submit the quiz?',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            icon: 'info'
        }).then(function (e) {
            if (e.isConfirmed) {
                _this.evalQuiz();
            }
        });
    };
    StartquizComponent.prototype.startTimer = function () {
        var _this = this;
        var t = window.setInterval(function () {
            //code
            if (_this.timer <= 0) {
                _this.evalQuiz();
                clearInterval(t);
            }
            else {
                _this.timer--;
            }
        }, 1000);
    };
    StartquizComponent.prototype.getFormattedTme = function () {
        var mm = Math.floor(this.timer / 60);
        var ss = this.timer % 60;
        return mm + " min : " + ss + " sec";
    };
    StartquizComponent.prototype.evalQuiz = function () {
        var _this = this;
        var questionsWithAnswers = this.questions.map(function (question) {
            return {
                idquestion: question.idquestion,
                givenAnswer: question.givenAnswer
            };
        });
        this.questionService.evalQuiz(this.qid, questionsWithAnswers).subscribe(function (data) {
            console.log(data);
            _this.marksGot = parseFloat(Number(data.marksGot).toFixed(2));
            _this.correctAnswers = data.correctAnswer;
            _this.attempted = data.attempted;
            _this.isSubmit = true;
        }, function (error) {
            console.log(error);
        });
    };
    StartquizComponent.prototype.printPage = function () {
        window.print();
    };
    // Dans votre composant TypeScript
    StartquizComponent.prototype.isQuestionAnswered = function (index) {
        return this.questions[index].givenAnswer !== undefined && this.questions[index].givenAnswer !== '';
    };
    StartquizComponent.prototype.nextQuestion = function () {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.isLastQuestion = this.currentQuestionIndex === this.questions.length - 1;
        }
    };
    StartquizComponent.prototype.previousQuestion = function () {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.isLastQuestion = false; // Assurez-vous de remettre à jour isLastQuestion
        }
    };
    StartquizComponent = __decorate([
        core_1.Component({
            selector: 'app-startquiz',
            templateUrl: './startquiz.component.html',
            styleUrls: ['./startquiz.component.css']
        })
    ], StartquizComponent);
    return StartquizComponent;
}());
exports.StartquizComponent = StartquizComponent;
