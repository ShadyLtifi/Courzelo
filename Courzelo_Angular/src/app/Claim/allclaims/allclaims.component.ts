import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ClaimService } from 'src/app/Service/Claim/claim.service';
import { Claim, Status, TypeClaim } from 'src/app/models/Claim/claim';

@Component({
  selector: 'app-allclaims',
  templateUrl: './allclaims.component.html',
  styleUrls: ['./allclaims.component.css']
})
export class AllclaimsComponent implements OnInit {
  claims?: Claim[] = [];
  currentClaim?:  Claim;
  currentIndex = -1;

  constructor(private claimService: ClaimService, private router: Router) {}

  ngOnInit(): void {
    this.retrieveAllClaims();  
  }
  setActiveClaim(c: Claim, index: number): void {
    this.currentClaim=c;
    this.currentIndex = index;
  }
  retrieveAllClaims() {
    this.claimService.getAllClaims().subscribe(
      data => {
        this.claims = data;
      },
      error => {
        console.error('Erreur lors de la récupération des réclamations :', error);
      }
    );
  }

  

  deleteClaim(idclaim: string | undefined): void {
    if (idclaim) {
      this.claimService.deleteClaim(idclaim).subscribe(
        () => {
          console.log('Quiz with ID ${idclaim} deleted successfully.');
          // Update the class list or perform any necessary actions
          this.loadClaims(); // Reload the updated class list
        },
        (error) => {
          console.error('Error deleting Quiz:', error);
          // Handle error scenarios
        }
      );
    } else {
      console.error('Claim ID is undefined. Cannot delete.');
    }
  }
  loadClaims(): void {
    this.claimService.getAllClaims().subscribe(
      (updatedclaims: any[]) => {
        this.claims = updatedclaims;
      },
      (error) => {
        console.error('Error refreshing quiz list:', error);
        // Handle error scenarios
      }
    );
  }
  
}
