"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InstructionComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var InstructionComponent = /** @class */ (function () {
    function InstructionComponent(_route, quizService, router) {
        this._route = _route;
        this.quizService = quizService;
        this.router = router;
    }
    InstructionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.qid = this._route.snapshot.params['qid'];
        this.quizService.retrieveQuiz(this.qid).subscribe(function (data) {
            _this.quizz = data;
            console.log("this is the quiz from the instrunction ", _this.quizz);
        }, function (error) {
            console.log(error);
            alert("error");
        });
    };
    InstructionComponent.prototype.startQuiz = function () {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Do you want to start the quiz?',
            showCancelButton: true,
            confirmButtonText: 'Start',
            denyButtonText: "Don't save",
            icon: 'info'
        }).then(function (result) {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                _this.router.navigate(['/start/' + _this.qid]);
                // Swal.fire('Saved!', '', 'success')
            }
            else if (result.isDenied) {
                sweetalert2_1["default"].fire('Changes are not saved', '', 'info');
            }
        });
    };
    InstructionComponent = __decorate([
        core_1.Component({
            selector: 'app-instruction',
            templateUrl: './instruction.component.html',
            styleUrls: ['./instruction.component.css']
        })
    ], InstructionComponent);
    return InstructionComponent;
}());
exports.InstructionComponent = InstructionComponent;
