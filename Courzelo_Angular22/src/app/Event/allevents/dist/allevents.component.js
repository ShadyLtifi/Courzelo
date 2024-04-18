"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AlleventsComponent = void 0;
var core_1 = require("@angular/core");
var sweetalert2_1 = require("sweetalert2");
var AlleventsComponent = /** @class */ (function () {
    function AlleventsComponent(eventService, router) {
        this.eventService = eventService;
        this.router = router;
        this.events = [];
        this.uploadPath = 'assets/uploads/';
        this.eventPhotos = {};
        this.progress = 0;
        this.message = '';
        this.searchTerm = '';
        this.calendarOptions = {
            initialView: 'dayGridMonth',
            events: [] // Assurez-vous que cela est rempli avec des données formatées correctement
        };
        this.calendarEventsForFullCalendar = [];
    }
    AlleventsComponent.prototype.ngOnInit = function () {
        this.retrieveAllEvents();
    };
    AlleventsComponent.prototype.selectFile = function (event) {
        this.selectedFiles = event.target.files;
    };
    AlleventsComponent.prototype.retrieveAllEvents = function () {
        var _this = this;
        this.eventService.getAll().subscribe(function (data) {
            _this.events = data;
            _this.events.forEach(function (event) {
                if (event.idevent) {
                    _this.eventService.getEventPhoto(event.idevent).subscribe(function (photoUrl) {
                        event.photoUrl = photoUrl; // Set the photo URL for each event
                    });
                }
            });
        }, function (error) {
            console.error('Error fetching events:', error);
        });
    };
    AlleventsComponent.prototype.search = function () {
        var _this = this;
        if (this.searchTerm) {
            this.eventService.searchEventsByTitle(this.searchTerm).subscribe({
                next: function (data) { return _this.events = data; },
                error: function (err) { return console.error('Error fetching search results:', err); }
            });
        }
        else {
            this.retrieveAllEvents(); // Charge tous les événements si le champ de recherche est vide
        }
    };
    AlleventsComponent.prototype.deleteEvent = function (idevent) {
        var _this = this;
        sweetalert2_1["default"].fire({
            icon: 'warning',
            title: 'Are you sure ?',
            confirmButtonText: 'Delete',
            showCancelButton: true
        }).then(function (result) {
            if (result.isConfirmed) {
                if (idevent) {
                    _this.eventService.deleteEvent(idevent).subscribe(function () {
                        // console.log(`Event with ID ${idevent} deleted successfully.`);
                        // Actualiser la liste des événements après la suppression
                        _this.retrieveAllEvents();
                        sweetalert2_1["default"].fire("Success !!", "Quiz deleted", 'success');
                    }, function (error) {
                        sweetalert2_1["default"].fire("Error !!", "Error in deleting quiz", 'error');
                    });
                }
                else {
                    console.error('Quiz ID is undefined. Cannot delete.');
                }
            }
        });
    };
    AlleventsComponent = __decorate([
        core_1.Component({
            selector: 'app-allevents',
            templateUrl: './allevents.component.html',
            styleUrls: ['./allevents.component.css']
        })
    ], AlleventsComponent);
    return AlleventsComponent;
}());
exports.AlleventsComponent = AlleventsComponent;
