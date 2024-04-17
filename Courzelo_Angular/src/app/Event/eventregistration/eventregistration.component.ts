import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { EventRegistration } from 'src/app/models/Event/EventRegistration';
import { EventRegistrationService } from 'src/app/Service/event-registration.service';
import { EventService } from 'src/app/Service/Event/event.service';

@Component({
  selector: 'app-eventregistration',
  templateUrl: './eventregistration.component.html',
  styleUrls: ['./eventregistration.component.css']
})
export class EventregistrationComponent implements OnInit {


  eventRegistrations: EventRegistration[] = [];

  constructor(private eventRegistrationService: EventRegistrationService,private eventService: EventService) {}

  ngOnInit(): void {
    this.eventRegistrationService.getEventRegistrations().subscribe(
      (data) => {
        this.eventRegistrations = data;
        console.log(this.eventRegistrations);  // Debug: Check the data structure
      },
      (error) => console.error('Failed to load event registrations', error)
    );
    this.loadRegistrations();  // Load registrations when the component initializes

  }

  confirmRegistration(registrationId: string) {
    this.eventRegistrationService.confirmRegistration(registrationId).subscribe({
        next: (response) => {
            alert('Registration confirmed and email sent');
            this.loadRegistrations();  // Reload or update the list to reflect changes
        },
        error: (error) => {
            console.error('Failed to confirm registration', error);
        }
    });
  

}
loadRegistrations() {
  this.eventRegistrationService.getEventRegistrations().subscribe({
    next: (registrations) => {
      this.eventRegistrations = registrations;  // Assign the response to your component's variable
    },
    error: (error) => {
      console.error('Error loading registrations:', error);
    }
  });
}



showStatistics(): void {
  this.eventService.getTopParticipatedEvents().subscribe({
    next: (events) => {
      const message = events.map(event => `${event.title} - Registrations: ${event.eventRegs.length}`).join('\n');
      alert(`Top Participated Events:\n${message}`);
    },
    error: (error) => {
      console.error('Failed to load event statistics', error);
      alert('Failed to load event statistics');
    }
  });
}



}