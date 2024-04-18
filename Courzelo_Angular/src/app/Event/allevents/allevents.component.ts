import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EventService } from 'src/app/Service/Event/event.service';
import { Event } from 'src/app/models/Event/event';
import { Speaker } from 'src/app/models/Event/speaker';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-allevents',
  templateUrl: './allevents.component.html',
  styleUrls: ['./allevents.component.css']
})
export class AlleventsComponent implements OnInit {
  events: Event[] = [];
  uploadPath: string = 'assets/uploads/';
  eventPhotos: { [key: string]: string } = {};
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  speakers?: Speaker;
  searchTerm: string = '';
 
  fileInfos?: Observable<any>;

  constructor(private eventService: EventService, private router: Router   
  ) {}

  ngOnInit(): void {
  this.retrieveAllEvents();


  }
 
  
  

  selectFile(event:any): void{
    this.selectedFiles = event.target.files;

  }

  retrieveAllEvents(): void {
    this.eventService.getAll().subscribe(
      data => {
        this.events = data;
        this.events.forEach(event => {
          if (event.idevent) {
            this.eventService.getEventPhoto(event.idevent).subscribe(photoUrl => {
              event.photoUrl = photoUrl; // Set the photo URL for each event
            });
          }
        });
      },
      error => {
        console.error('Error fetching events:', error);
      }
    );
  }


search(): void {
  if (this.searchTerm) {
    this.eventService.searchEventsByTitle(this.searchTerm).subscribe({
      next: (data) => this.events = data,
      error: (err) => console.error('Error fetching search results:', err)
    });
  } else {
    this.retrieveAllEvents(); // Charge tous les événements si le champ de recherche est vide
  }
}



  deleteEvent(idevent: string | undefined): void {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (idevent) {
          this.eventService.deleteEvent(idevent).subscribe(
            () => {
              // console.log(`Event with ID ${idevent} deleted successfully.`);
              // Actualiser la liste des événements après la suppression
              this.retrieveAllEvents();
              Swal.fire("Success !!", "Quiz deleted", 'success');
            },
            (error) => {
              Swal.fire("Error !!", "Error in deleting quiz", 'error');
            }
          );
        } else {
          console.error('Quiz ID is undefined. Cannot delete.');
        }
      }
    });
  }
}  



    
