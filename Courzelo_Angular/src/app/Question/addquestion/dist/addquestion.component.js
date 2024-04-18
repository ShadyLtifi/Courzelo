"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddquestionComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddquestionComponent = /** @class */ (function () {
    function AddquestionComponent(formBuilder, questionService, router) {
        this.formBuilder = formBuilder;
        this.questionService = questionService;
        this.router = router;
        this.questionForm = this.formBuilder.group({
            questionText: ['', forms_1.Validators.required],
            correctanswer: ['', forms_1.Validators.required],
            options: this.formBuilder.array([this.createOption()])
        });
    }
    AddquestionComponent.prototype.ngOnInit = function () { };
    AddquestionComponent.prototype.createOption = function () {
        return this.formBuilder.control('', forms_1.Validators.required);
    };
    AddquestionComponent.prototype.addOption = function () {
        var optionsArray = this.questionForm.get('options');
        optionsArray.push(this.createOption());
    };
    AddquestionComponent.prototype.removeOption = function (index) {
        var optionsArray = this.questionForm.get('options');
        optionsArray.removeAt(index);
    };
    AddquestionComponent.prototype.onSubmit = function () {
        var _this = this;
        if (this.questionForm.valid) {
            var question = {
                questionText: this.questionForm.value.questionText,
                correctanswer: this.questionForm.value.correctanswer,
                options: this.questionForm.value.options
            };
            this.questionService.addQuestion(question).subscribe(function () {
                console.log('Question added successfully.');
                _this.router.navigate(['/allquestions']);
            }, function (error) {
                console.error('Error adding question', error);
            });
        }
        else {
            this.markFormControlsAsTouched(this.questionForm);
        }
    };
    AddquestionComponent.prototype.markFormControlsAsTouched = function (formGroup) {
        var _this = this;
        Object.values(formGroup.controls).forEach(function (control) {
            control.markAsTouched();
            if (control instanceof forms_1.FormGroup || control instanceof forms_1.FormArray) {
                _this.markFormControlsAsTouched(control);
            }
        });
    };
    AddquestionComponent.prototype.isFieldInvalid = function (field) {
        var control = this.questionForm.get(field);
        return control && control.touched && control.invalid;
    };
    AddquestionComponent.prototype.isOptionInvalid = function (index) {
        var optionsArray = this.questionForm.get('options');
        if (optionsArray instanceof forms_1.FormArray) {
            var optionControl = optionsArray.at(index);
            return optionControl && optionControl.touched && optionControl.invalid;
        }
        return false;
    };
    Object.defineProperty(AddquestionComponent.prototype, "options", {
        get: function () {
            return this.questionForm.get('options');
        },
        enumerable: false,
        configurable: true
    });
    AddquestionComponent = __decorate([
        core_1.Component({
            selector: 'app-addquestion',
            templateUrl: './addquestion.component.html',
            styleUrls: ['./addquestion.component.css']
        })
    ], AddquestionComponent);
    return AddquestionComponent;
}());
exports.AddquestionComponent = AddquestionComponent;
