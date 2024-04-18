import { Component } from '@angular/core';
import { PublicationService } from 'src/app/Service/Forum/Publication/publication.service';
import { Publication } from 'src/app/models/Publication/pub';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent {
  publication?: any[] =[];
  currentPub?: Publication;
  currentIndex = -1;
  constructor(private pubService: PublicationService) { }
  ngOnInit(): void {
    this.retrieveAllPub();
  }
  setActivePub(c: Publication, index: number): void {
    this.currentPub = c;
    this.currentIndex = index;
  }
  retrieveAllPub(): void {
    this.pubService.getAll()
      .subscribe(
        (data: Publication[]) => {
          this.publication = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
         
        
  }

  deletePublication(idpub: string | undefined): void {
    if (idpub) {
      this.pubService.DeletePublication(idpub).subscribe(
        () => {
          console.log(`Publication with ID ${idpub} deleted successfully.`);
          // Update the class list or perform any necessary actions
          this.refreshClassList(); // Reload the updated class list
        },
        (error) => {
          console.error('Error deleting Publication:', error);
          // Handle error scenarios
        }
      );
    } else {
      console.error('Publication ID is undefined. Cannot delete.');
    }
  }

  refreshClassList(): void {
    // Here, you should fetch the updated list of classes from your service
    // and update the local variable 'classes'
    this.pubService.getAll().subscribe(
      (updatedClasses: any[]) => {
        this.publication = updatedClasses;
      },
      (error) => {
        console.error('Error refreshing Publication list:', error);
        // Handle error scenarios
      }
    );
  
  
}
}
