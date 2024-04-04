import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicationService } from 'src/app/Service/Forum/Publication/publication.service';
import { Publication } from 'src/app/models/Publication/pub';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.css']
})
export class AddPublicationComponent {
  pubForm: FormGroup <any>;
  publicaton: any = { message:'' ,datepub: "" }; 
 
 
  constructor(private fb:FormBuilder, private pubService:PublicationService, private route: ActivatedRoute, private router:Router){
    this.pubForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(3)]],
      datepub: ['', Validators.required],
    });

  }
  ngOnInit(): void {}

  isFieldInvalid(field: string) {
    const control = this.pubForm.get(field);
    return control && control.touched && control.invalid;
  }
  onSubmit() {
    if (this.pubForm.valid) {
      const newPub: Publication = {
        message: this.pubForm.get('message')?.value,
        
        datepub: this.pubForm.get('datepub')?.value,
      };
      
  
      if (newPub.message !== null  && newPub.datepub !== null) {
        this.pubService.addModule(newPub).subscribe(
          () => {
            console.log('Publication added successfully!');
            // Ajoutez ici la navigation ou d'autres actions après l'ajout réussi
            this.router.navigate(['/allPublication']);
          },
          (error) => {
            console.error('Error adding Publication ', error);
          }
        );
      } else {
        console.log('Form values are null. Cannot add Publication.');
      }
    } else {
      console.log('Form is invalid. Cannot add Publication.');
    }
  }
 

}
