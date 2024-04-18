import { Component } from '@angular/core';
import { LessonService } from '../Service/Course/Lesson/lesson.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exemple1',
  templateUrl: './exemple1.component.html',
  styleUrls: ['./exemple1.component.css']
})
export class Exemple1Component {
  content: any [] = [];
  lessonContent !: string;
  contentType: string | null = null;

  constructor(private lessonService: LessonService, private route: ActivatedRoute) { }

 
//   ngOnInit(): void {
//   this.route.paramMap.subscribe(params => {
//     const lessonId = params.get('id');
//     if (lessonId) {
//       this.lessonService.getFileContentByLessonId(lessonId).subscribe(
//         response => {
//           const mimeType = response.headers.get('content-type');
//           const fileContent = response.body;
//           if (fileContent) {
//             if (mimeType?.startsWith('image')) {
//               // Si le contenu est une image, créer une URL blob pour l'afficher
//               const blob = new Blob([fileContent], { type: mimeType });
//               this.lessonContent = URL.createObjectURL(blob);
//               this.contentType = 'image'; // Définir le type de contenu comme image
//             } else if (mimeType?.startsWith('pdf')) {
//               // Si le contenu est un PDF, créer une URL blob pour l'afficher dans un iframe
//               const blob = new Blob([fileContent], { type: mimeType });
//               this.lessonContent = URL.createObjectURL(blob);
//               this.contentType = 'pdf'; // Définir le type de contenu comme PDF
//             } else {
//               // Si le contenu est un texte ou autre, décoder en tant qu'UTF-8
//               this.lessonContent = new TextDecoder('utf-8').decode(fileContent);
//               this.contentType = 'text'; // Définir le type de contenu comme texte
//             }
//           } else {
//             console.error('Empty lesson content received');
//           }
//         },
//         error => {
//           console.error('Error fetching lesson content:', error);
//         }
//       );
//     }
//   });
// }


// Dans votre composant Angular

ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    const lessonId = params.get('id');
    if (lessonId) {
      this.lessonService.getFileContentByLessonId(lessonId).subscribe(
        response => {
          const mimeType = response.headers.get('content-type');
          const fileContent = response.body;
          if (fileContent) {
            if (mimeType?.startsWith('image')) {
                           // Si le contenu est une image, créer une URL blob pour l'afficher
                            const blob = new Blob([fileContent], { type: mimeType });
                            this.lessonContent = URL.createObjectURL(blob);
                            this.contentType = 'image'; // Définir le type de contenu comme image
                          } else
            if (mimeType?.startsWith('application/pdf')) {
              const blob = new Blob([fileContent], { type: mimeType });
              const pdfUrl = URL.createObjectURL(blob);
              this.showPdf(pdfUrl);
            } else if (mimeType?.startsWith('application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
              const blob = new Blob([fileContent], { type: mimeType });
              const docxUrl = URL.createObjectURL(blob);
              this.showDocx(docxUrl);
            } else {
              this.lessonContent = new TextDecoder('utf-8').decode(fileContent);
                            this.contentType = 'text'; // Définir le type de contenu comme texte
                            
            }
          } else {
            console.error('Empty lesson content received');
          }
        },
        error => {
          console.error('Error fetching lesson content:', error);
        }
      );
    }
  });
}


showPdf(pdfUrl: string) {
  // Ouvrir le PDF dans un nouvel onglet
  window.open(pdfUrl, '_blank');
}
showDocx(docxUrl: string) {
  window.open(docxUrl, '_blank');
}

showTxt(txtUrl: string) {
  window.open(txtUrl, '_blank');
}
}
