"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddEventComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var event_1 = require("src/app/models/Event/event");
var sweetalert2_1 = require("sweetalert2");
var AddEventComponent = /** @class */ (function () {
    function AddEventComponent(fb, eventService, router, speakerService) {
        var _this = this;
        this.fb = fb;
        this.eventService = eventService;
        this.router = router;
        this.speakerService = speakerService;
        this.category = Object.values(event_1.Category);
        this.progress = 0;
        this.message = '';
        this.Speakerrows = [
            this.speakerService.getAll().subscribe(function (data) { return _this.speakers = data; })
        ];
        this.eventForm = this.fb.group({
            title: ['', [forms_1.Validators.required, forms_1.Validators.minLength(3)]],
            maxcapacity: ['', forms_1.Validators.required],
            duration: ['', forms_1.Validators.required],
            debutdate: ['', forms_1.Validators.required],
            price: ['', forms_1.Validators.required],
            category: ['', forms_1.Validators.required],
            photo: [''],
            name: ['', forms_1.Validators.required]
        });
    }
    AddEventComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.speakerService.getAll().subscribe(function (data) {
            _this.speakers = data;
        }, function (error) {
            console.error('There was an error loading the speakers', error);
        }); // Pass your actual Google Calendar ID here
    };
    AddEventComponent.prototype.onFileSelected = function (event) {
        this.selectedFile = event.target.files[0];
    };
    AddEventComponent.prototype.getSelectedFilePreview = function () {
        if (this.selectedFile) {
            return URL.createObjectURL(this.selectedFile);
        }
        return '';
    };
    AddEventComponent.prototype.goToList = function () {
        this.router.navigate(['/allevents']); // Replace '/allevents' with the URL of your event list
    };
    AddEventComponent.prototype.isFieldInvalid = function (field) {
        var control = this.eventForm.get(field);
        return control && control.touched && control.invalid;
    };
    AddEventComponent.prototype.onSubmit = function () {
        var _this = this;
        var _a;
        if (this.eventForm.valid && this.selectedFile) {
            var newEvent = this.eventForm.value; // Directly use the form value if the fields match your event model.
            // Add a new event with the service.
            var speakerName = (_a = this.eventForm.get('name')) === null || _a === void 0 ? void 0 : _a.value;
            if (!speakerName) {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Speaker name is missing!'
                });
                return;
            }
            this.eventService.addEventWithSpeaker(newEvent, speakerName).subscribe(function (event) {
                if (event && event.idevent && _this.selectedFile) {
                    var formData = new FormData();
                    formData.append('file', _this.selectedFile);
                    _this.eventService.uploadEventPhoto(event.idevent, formData).subscribe(function () {
                        sweetalert2_1["default"].fire({
                            icon: 'success',
                            title: 'Success!',
                            text: 'Photo uploaded successfully!'
                        }).then(function (result) {
                            if (result.isConfirmed) {
                                _this.router.navigate(['/allevents']);
                            }
                        });
                    }, function (error) {
                        sweetalert2_1["default"].fire({
                            icon: 'error',
                            title: 'Upload Failed',
                            text: 'Error uploading photo'
                        });
                    });
                }
                else {
                    sweetalert2_1["default"].fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Form is not valid. Cannot add event.'
                    });
                }
            }, function (error) {
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Error adding event'
                });
            });
        }
        else {
            sweetalert2_1["default"].fire({
                icon: 'warning',
                title: 'Invalid Form',
                text: 'Please check the form data and try again.'
            });
        }
    };
    AddEventComponent = __decorate([
        core_1.Component({
            selector: 'app-add-class',
            templateUrl: './addevent.component.html',
            styleUrls: ['./addevent.component.css']
        })
    ], AddEventComponent);
    return AddEventComponent;
}());
exports.AddEventComponent = AddEventComponent;
