"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdatequestionComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UpdatequestionComponent = /** @class */ (function () {
    function UpdatequestionComponent(formBuilder, route, router, questionService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.questionService = questionService;
        this.updateForm = this.formBuilder.group({
            questionText: ['', forms_1.Validators.required],
            correctAnswer: ['', forms_1.Validators.required],
            options: this.formBuilder.array([])
        });
        this.optionsArray = this.updateForm.get('options');
    }
    UpdatequestionComponent.prototype.ngOnInit = function () {
        this.idquestion = this.route.snapshot.params['id'];
        this.loadQuestionDetails();
    };
    UpdatequestionComponent.prototype.loadQuestionDetails = function () {
        var _this = this;
        this.questionService.retrieveQuestion(this.idquestion).subscribe(function (data) {
            _this.updateForm.patchValue({
                questionText: data.questionText,
                correctAnswer: data.correctanswer
            });
            if (data.options) {
                _this.setExistingOptions(data.options);
            }
        }, function (error) {
            console.error('Error loading question details', error);
        });
    };
    UpdatequestionComponent.prototype.isFieldInvalid = function (field) {
        var control = this.updateForm.get(field);
        return control && control.touched && control.invalid;
    };
    UpdatequestionComponent.prototype.setExistingOptions = function (options) {
        var _this = this;
        options.forEach(function (option) {
            _this.optionsArray.push(_this.formBuilder.control(option || '', forms_1.Validators.required));
        });
    };
    UpdatequestionComponent.prototype.addOption = function () {
        this.optionsArray.push(this.formBuilder.control('', forms_1.Validators.required));
    };
    UpdatequestionComponent.prototype.removeOption = function (index) {
        this.optionsArray.removeAt(index);
    };
    UpdatequestionComponent.prototype.updateQuestion = function () {
        var _this = this;
        if (this.updateForm.valid) {
            var updatedQuestion = {
                idquestion: this.idquestion,
                questionText: this.updateForm.value.questionText,
                correctanswer: this.updateForm.value.correctAnswer,
                options: this.updateForm.value.options
            };
            this.questionService.updateQuestion(this.idquestion, updatedQuestion).subscribe(function (data) {
                console.log('Question updated successfully', data);
                _this.router.navigate(['/allquestions']);
            }, function (error) {
                console.error('Error updating question', error);
            });
        }
    };
    UpdatequestionComponent = __decorate([
        core_1.Component({
            selector: 'app-updatequestion',
            templateUrl: './updatequestion.component.html',
            styleUrls: ['./updatequestion.component.css']
        })
    ], UpdatequestionComponent);
    return UpdatequestionComponent;
}());
exports.UpdatequestionComponent = UpdatequestionComponent;
