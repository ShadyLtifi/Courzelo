import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Router } from '@angular/router';
import { EventService } from '../Service/Event/event.service';
import { Event } from '../models/Event/event';
import Swiper from 'swiper';
import { catchError, forkJoin, of } from 'rxjs';
import { EventRegistrationService } from '../Service/event-registration.service';


@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.css']
})
export class FrontComponent implements OnInit, AfterViewInit {
  @ViewChild('swiperRef', { static: false }) swiperRef!: ElementRef;
  selectedEventId!: string; // This will hold the ID of the selected event

  events: Event[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 1;
  totalEvents: number = 0;
  
  userId = 'staticUserId'; // Example user ID, replace with actual data as needed
  constructor(
   
    private router: Router,
    private eventService: EventService,
  private registrationService: EventRegistrationService

  ) {}

  ngOnInit(): void {
    this.loadEvents();
  }

  ngAfterViewInit() {
    this.initializeSwiper();
  }

  loadEvents() {
    this.eventService.getAllEventSorted().subscribe(
      (data) => {
        // Assurez-vous d'abord de stocker les données reçues dans `this.events`
        this.events = data;  // S'il faut trier par une certaine propriété, vous pouvez le faire ici.
  
        // Exemple de tri par `idevent`, en assumant que `idevent` est toujours défini :
        // this.events.sort((a, b) => (b.idevent || '0').localeCompare(a.idevent || '0'));
  
        // Créez un tableau d'observables pour les URLs des photos
        const photoRequests = this.events.map(event => {
          if (event.idevent) {
            return this.eventService.getEventPhoto(event.idevent).pipe(
              catchError(error => {
                console.error(`Failed to load photo for event ${event.idevent}:`, error);
                return of(null); // return null if there's an error fetching the photo
              })
            );
          } else {
            return of(null); // return null immediately for events without an ID
          }
        });
  
        // Attendre que toutes les requêtes de photo soient complétées
        forkJoin(photoRequests).subscribe(photoUrls => {
          // Assigner les URLs des photos aux événements
          photoUrls.forEach((url, index) => {
            if (url) {
              this.events[index].photoUrl = url;
            }
          });
  
          // Maintenant que toutes les photos sont chargées, initialisez le swiper
          this.initializeSwiper();
        });
      },
      error => {
        console.error('There was an error loading events!', error);
      }
    );
  }
  
   





  initializeSwiper() {
    if (this.events && this.events.length > 0) {
      const swiper = new Swiper(this.swiperRef.nativeElement, {
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadEvents();
  }

  participate(event: Event): void {
    console.log("Participating in event:", event);
  }




 

 // Example event IDs, replace with actual data as needed



 registerForEvent(eventId: string): void {
  this.registrationService.registerUserToEvents(this.userId, eventId).subscribe({
    next: (response) => console.log('Registration Successful', response),
    error: (error) => console.error('Registration Failed', error)
  });
}


}
