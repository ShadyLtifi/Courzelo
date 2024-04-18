import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-profile',
  template: `
    <div *ngIf="isAdmin">Contenu pour l'administrateur</div>
    <div *ngIf="isEtudiant">Contenu pour l'etudiant</div>
    <div *ngIf="isEnseignant">Contenu pour l'enseignant</div>
    <div *ngIf="isPartenaire">Contenu pour le partenaire</div>
  `
})
export class ProfileComponent implements OnInit {
  isAdmin: boolean = false;
  isEtudiant: boolean = false;
  isEnseignant: boolean = false;
  isPartenaire: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const userRoles = this.userService.getUserRoles();
    if (userRoles) {
      this.isAdmin = userRoles.includes('ADMIN');
      this.isEtudiant = userRoles.includes('ETUDIANT');
      this.isEnseignant = userRoles.includes('ENSEIGNANT');
      this.isPartenaire = userRoles.includes('PARTENAIRE');
    }
  }
}
