"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FrontComponent = void 0;
var core_1 = require("@angular/core");
var swiper_1 = require("swiper");
var rxjs_1 = require("rxjs");
var FrontComponent = /** @class */ (function () {
    function FrontComponent(authService, router, eventService, registrationService) {
        this.authService = authService;
        this.router = router;
        this.eventService = eventService;
        this.registrationService = registrationService;
        this.events = [];
        this.currentPage = 1;
        this.itemsPerPage = 1;
        this.totalEvents = 0;
        this.userId = 'staticUserId'; // Example user ID, replace with actual data as needed
    }
    FrontComponent.prototype.ngOnInit = function () {
        this.loadEvents();
    };
    FrontComponent.prototype.ngAfterViewInit = function () {
        this.initializeSwiper();
    };
    FrontComponent.prototype.loadEvents = function () {
        var _this = this;
        this.eventService.getAllEventSorted().subscribe(function (data) {
            // Assurez-vous d'abord de stocker les données reçues dans `this.events`
            _this.events = data; // S'il faut trier par une certaine propriété, vous pouvez le faire ici.
            // Exemple de tri par `idevent`, en assumant que `idevent` est toujours défini :
            // this.events.sort((a, b) => (b.idevent || '0').localeCompare(a.idevent || '0'));
            // Créez un tableau d'observables pour les URLs des photos
            var photoRequests = _this.events.map(function (event) {
                if (event.idevent) {
                    return _this.eventService.getEventPhoto(event.idevent).pipe(rxjs_1.catchError(function (error) {
                        console.error("Failed to load photo for event " + event.idevent + ":", error);
                        return rxjs_1.of(null); // return null if there's an error fetching the photo
                    }));
                }
                else {
                    return rxjs_1.of(null); // return null immediately for events without an ID
                }
            });
            // Attendre que toutes les requêtes de photo soient complétées
            rxjs_1.forkJoin(photoRequests).subscribe(function (photoUrls) {
                // Assigner les URLs des photos aux événements
                photoUrls.forEach(function (url, index) {
                    if (url) {
                        _this.events[index].photoUrl = url;
                    }
                });
                // Maintenant que toutes les photos sont chargées, initialisez le swiper
                _this.initializeSwiper();
            });
        }, function (error) {
            console.error('There was an error loading events!', error);
        });
    };
    FrontComponent.prototype.initializeSwiper = function () {
        if (this.events && this.events.length > 0) {
            var swiper = new swiper_1["default"](this.swiperRef.nativeElement, {
                spaceBetween: 30,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                }
            });
        }
    };
    FrontComponent.prototype.onPageChange = function (page) {
        this.currentPage = page;
        this.loadEvents();
    };
    FrontComponent.prototype.participate = function (event) {
        console.log("Participating in event:", event);
    };
    FrontComponent.prototype.onLogout = function () {
        this.authService.logout();
        this.router.navigate(['/login']);
    };
    // Example event IDs, replace with actual data as needed
    FrontComponent.prototype.registerForEvent = function (eventId) {
        this.registrationService.registerUserToEvents(this.userId, eventId).subscribe({
            next: function (response) { return console.log('Registration Successful', response); },
            error: function (error) { return console.error('Registration Failed', error); }
        });
    };
    __decorate([
        core_1.ViewChild('swiperRef', { static: false })
    ], FrontComponent.prototype, "swiperRef");
    FrontComponent = __decorate([
        core_1.Component({
            selector: 'app-front',
            templateUrl: './front.component.html',
            styleUrls: ['./front.component.css']
        })
    ], FrontComponent);
    return FrontComponent;
}());
exports.FrontComponent = FrontComponent;
