import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { EventService } from 'src/app/Service/Event/event.service';
import { SpeakerService } from 'src/app/Service/Event/speaker.service';
import { Category, Event } from 'src/app/models/Event/event';
import { Speaker } from 'src/app/models/Event/speaker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-class',
  templateUrl: './addevent.component.html',
  styleUrls: ['./addevent.component.css']
})
export class AddEventComponent implements OnInit {
  eventForm: FormGroup;
  category = Object.values(Category);
  selectedFile: File | undefined;
  event!:Event;
  speakers!: Speaker[];


  


  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private router: Router,
    private speakerService : SpeakerService,


  ) {
    this.eventForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      maxcapacity: ['', Validators.required],
      duration: ['', Validators.required],
      debutdate: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      photo: [''],
      name: ['', Validators.required],
    });
  }
ngOnInit(): void {
    this.speakerService.getAll().subscribe(
      data => {
        this.speakers = data;
      },
      error => {
        console.error('There was an error loading the speakers', error);
      }
    );// Pass your actual Google Calendar ID here
  }



 

    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0];
    }
    getSelectedFilePreview(): string {
      if (this.selectedFile) {
        return URL.createObjectURL(this.selectedFile);
      }
      return '';
    }
   
 Speakerrows = [
    this.speakerService.getAll().subscribe(data => this.speakers = data)
   
  ];
  
  

  goToList() {
    this.router.navigate(['/allevents']); // Replace '/allevents' with the URL of your event list
  }

  isFieldInvalid(field: string) {
    const control = this.eventForm.get(field);
    return control && control.touched && control.invalid;
  }

  onSubmit() {
    if (this.eventForm.valid && this.selectedFile) {
      const newEvent = this.eventForm.value; // Directly use the form value if the fields match your event model.
  
      // Add a new event with the service.
      const speakerName = this.eventForm.get('name')?.value;
      if (!speakerName) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Speaker name is missing!'
        });
        return;
      }
      this.eventService.addEventWithSpeaker(newEvent, speakerName).subscribe(
        (event: any) => {
          if (event && event.idevent && this.selectedFile) {
            const formData = new FormData();
            formData.append('file', this.selectedFile);
  
            this.eventService.uploadEventPhoto(event.idevent, formData).subscribe(
              () => {
                Swal.fire({
                  icon: 'success',
                  title: 'Success!',
                  text: 'Photo uploaded successfully!'
                }).then(result => {
                  if (result.isConfirmed) {
                    this.router.navigate(['/allevents']);
                  }
                });
              },
              (error: any) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Upload Failed',
                  text: 'Error uploading photo'
                });
              }
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Form is not valid. Cannot add event.'
            });
          }
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error adding event'
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Form',
        text: 'Please check the form data and try again.'
      });
    }
  }
  



}
  