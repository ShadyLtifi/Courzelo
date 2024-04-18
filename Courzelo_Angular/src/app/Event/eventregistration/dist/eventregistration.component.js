"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EventregistrationComponent = void 0;
var core_1 = require("@angular/core");
var EventregistrationComponent = /** @class */ (function () {
    function EventregistrationComponent(eventRegistrationService) {
        this.eventRegistrationService = eventRegistrationService;
        this.eventRegistrations = [];
    }
    EventregistrationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.eventRegistrationService.getEventRegistrations().subscribe(function (data) {
            _this.eventRegistrations = data;
            console.log(_this.eventRegistrations); // Debug: Check the data structure
        }, function (error) { return console.error('Failed to load event registrations', error); });
        this.loadRegistrations(); // Load registrations when the component initializes
    };
    EventregistrationComponent.prototype.confirmRegistration = function (registrationId) {
        var _this = this;
        this.eventRegistrationService.confirmRegistration(registrationId).subscribe({
            next: function (response) {
                alert('Registration confirmed and email sent');
                _this.loadRegistrations(); // Reload or update the list to reflect changes
            },
            error: function (error) {
                console.error('Failed to confirm registration', error);
            }
        });
    };
    EventregistrationComponent.prototype.loadRegistrations = function () {
        var _this = this;
        this.eventRegistrationService.getEventRegistrations().subscribe({
            next: function (registrations) {
                _this.eventRegistrations = registrations; // Assign the response to your component's variable
            },
            error: function (error) {
                console.error('Error loading registrations:', error);
            }
        });
    };
    EventregistrationComponent = __decorate([
        core_1.Component({
            selector: 'app-eventregistration',
            templateUrl: './eventregistration.component.html',
            styleUrls: ['./eventregistration.component.css']
        })
    ], EventregistrationComponent);
    return EventregistrationComponent;
}());
exports.EventregistrationComponent = EventregistrationComponent;
