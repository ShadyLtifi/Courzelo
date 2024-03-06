import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClaimService } from 'src/app/Service/Claim/claim.service';
import { Claim, Status, TypeClaim } from 'src/app/models/Claim/claim';

@Component({
  selector: 'app-addclaim',
  templateUrl: './addclaim.component.html',
  styleUrls: ['./addclaim.component.css']
})
export class AddclaimComponent implements OnInit {
  claimForm!: FormGroup;
  typeClaim = Object.values(TypeClaim);
  status = Object.values(Status);

  constructor(
    private fb: FormBuilder,
    private claimService: ClaimService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.claimForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      dateclaim: ['', Validators.required],
      typeclaim: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  goToList() {
    this.router.navigate(['/allclaims']); // Replace '/listclaims' with the URL of your claim list
  }

  isFieldInvalid(field: string) {
    const control = this.claimForm.get(field);
    return control && control.touched && control.invalid;
  }

  onSubmit() {
    if (this.claimForm.valid) {
      const newClaim: Claim = {
        title: this.claimForm.get('title')?.value,
        dateclaim: this.claimForm.get('dateclaim')?.value,
        typeclaim: this.claimForm.get('typeclaim')?.value,
        status: this.claimForm.get('status')?.value
      };

      this.claimService.addClaim(newClaim).subscribe(
        () => {
          console.log('Claim added successfully!');
          this.router.navigate(['/allclaims']);
        },
        (error) => {
          console.error('Error adding claim', error);
        }
      );
    } else {
      console.log('Form values are null. Cannot add claim.');
    }
  }
}
