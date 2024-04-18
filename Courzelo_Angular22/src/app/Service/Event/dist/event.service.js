"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EventService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var EventService = /** @class */ (function () {
    function EventService(http) {
        this.http = http;
        this.apiUrl = 'http://localhost:6085';
    }
    EventService.prototype.getAll = function () {
        return this.http.get(this.apiUrl + "/retrieveallevents").pipe(rxjs_1.catchError(function (error) {
            console.error('Error retrieving events:', error);
            throw error; // Handle the error by the calling component
        }));
    };
    EventService.prototype.addEventWithSpeaker = function (event, name) {
        return this.http.post(this.apiUrl + "/addEventWithSpeaker/" + name, event);
    };
    EventService.prototype.addEvent = function (event) {
        return this.http.post(this.apiUrl + "/addEvent", event);
    };
    EventService.prototype.deleteEvent = function (id) {
        return this.http["delete"](this.apiUrl + "/deleteEvent/" + id);
    };
    EventService.prototype.updateEvent = function (idevent, eventData) {
        var url = this.apiUrl + "/updateEvent/" + idevent;
        return this.http.put(url, eventData);
    };
    EventService.prototype.retrieveEvent = function (idevent) {
        var url = this.apiUrl + "/retrieveEvent/" + idevent;
        return this.http.get(url);
    };
    EventService.prototype.searchEventsByTitle = function (title) {
        return this.http.get(this.apiUrl + "/search", { params: { title: title } });
    };
    EventService.prototype.uploadEventPhoto = function (eventId, formData) {
        return this.http.post("http://localhost:6085/uploadEventPhoto/" + eventId, formData, { responseType: 'text' });
    };
    EventService.prototype.getAllEvents = function (page, itemsPerPage) {
        var params = new http_1.HttpParams()
            .set('page', page - 1) // API might expect page index starting from 0
            .set('size', itemsPerPage);
        return this.http.get("" + this.apiUrl, { params: params });
    };
    // Vous pourriez avoir une fonction comme ceci pour récupérer tous les événements, incluant leurs photos
    EventService.prototype.getEventPhoto = function (idevent) {
        return this.http.get(this.apiUrl + "/contenu/" + idevent, { responseType: 'blob' }).pipe(rxjs_1.map(function (blob) {
            var urlCreator = window.URL || window.webkitURL;
            return urlCreator.createObjectURL(blob);
        }));
    };
    EventService.prototype.getAllEventSorted = function () {
        return this.http.get(this.apiUrl + "/events");
    };
    EventService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EventService);
    return EventService;
}());
exports.EventService = EventService;
