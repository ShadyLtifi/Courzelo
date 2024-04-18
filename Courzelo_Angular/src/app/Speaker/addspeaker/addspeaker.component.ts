import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeakerService } from 'src/app/Service/Event/speaker.service';
import { Speaker } from 'src/app/models/Event/speaker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-addspeaker',
  templateUrl: './addspeaker.component.html',
  styleUrls: ['./addspeaker.component.css']
})
export class AddspeakerComponent {
  speakerForm: FormGroup;
  speaker: any = { speakerName: '', title: "",  bio: "" }; 
 
  constructor(private fb:FormBuilder, private speakerService:SpeakerService, private route: ActivatedRoute, private router:Router){
    this.speakerForm = this.fb.group({ 
      name: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(3)]],
      bio: ['', Validators.required],
   
    });

  }
  ngOnInit(): void {}

 
  onSubmit() {
    if (this.speakerForm.valid) {
      const newSpeaker: Speaker = {
        name: this.speakerForm.get('name')?.value,
        title: this.speakerForm.get('title')?.value,
        bio: this.speakerForm.get('bio')?.value,
      };
  
      if (newSpeaker.name && newSpeaker.title && newSpeaker.bio) {
        this.speakerService.addSpeaker(newSpeaker).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: 'Speaker added successfully!',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/allspeakers']); // Navigate after alert is closed
            });
          },
          (error) => {
            console.error('Error adding speaker', error);
            Swal.fire({
              icon: 'error',
              title: 'Failed to add speaker',
              text: 'Please try again!'
            });
          }
        );
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Missing Information',
          text: 'All fields are required. Please fill out the form completely.'
        });
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Form',
        text: 'Please correct the errors in the form.'
      });
    }
  }
  
  isFieldInvalid(field: string) {
    const control = this.speakerForm.get(field);
    return control && control.touched && control.invalid;
  }

}
