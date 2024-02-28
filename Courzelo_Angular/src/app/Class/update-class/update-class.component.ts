import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClassService } from 'src/app/Service/Course/Class/class.service';
import { Level } from 'src/app/models/Class/class';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrls: ['./update-class.component.css']
})
export class UpdateClassComponent {
  updateForm: FormGroup;
  updatedClass: any = { capacity: '', level: '', progress: '' };
  level = Object.values(Level);


  constructor(private fb: FormBuilder, private classService: ClassService, private route: ActivatedRoute,  private router:Router) {
    this.updateForm = this.fb.group({
      capacity: ['', Validators.required],
      level: ['', Validators.required],
      progress: ['', Validators.required],
      // Add more fields as needed
    });
  }
  ngOnInit(): void {
    // Fetch class details and populate the form
    this.route.paramMap.subscribe(params => {
      const classid = params.get('id');
  
      if (classid !== null) {
        this.classService.retrieveClass(classid).subscribe(
          (classDetails: any) => {
            this.updatedClass = classDetails;
            this.updateForm.patchValue(classDetails); // Populate the form with class details
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
  


  updateClass() {
    const updatedClass = this.updateForm.value;
    this.classService.updateClass(updatedClass).subscribe(
      (response) => {
        console.log('Class updated successfully:', response);
       
        this.router.navigate(['/class-details/{{ class.idClass }}']); // Faites quelque chose après la mise à jour réussie, par exemple, naviguez vers une autre page
      },
      (error) => {
        console.error('Error updating class:', error);
      }
    );
  }
  
}
