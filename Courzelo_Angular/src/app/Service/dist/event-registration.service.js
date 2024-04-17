"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EventRegistrationService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var EventRegistrationService = /** @class */ (function () {
    function EventRegistrationService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:6085/register'; // Adjust this URL based on your actual API endpoint
        this.api = 'http://localhost:6085'; // Adjust this URL based on your actual API endpoint
    }
    EventRegistrationService.prototype.registerUserToEvents = function (userId, eventId) {
        var headers = new http_1.HttpHeaders({ 'Content-Type': 'application/json' });
        var body = JSON.stringify({ userId: userId, eventIds: [eventId] });
        return this.http.post(this.apiUrl, body, { headers: headers })
            .pipe(rxjs_1.catchError(function (error) {
            throw 'Error in posting data: ' + error;
        }));
    };
    EventRegistrationService.prototype.getEventRegistrations = function () {
        return this.http.get(this.api);
    };
    EventRegistrationService.prototype.confirmRegistration = function (registrationId) {
        return this.http.post("/api/confirm-registration/" + registrationId, {});
    };
    EventRegistrationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EventRegistrationService);
    return EventRegistrationService;
}());
exports.EventRegistrationService = EventRegistrationService;
