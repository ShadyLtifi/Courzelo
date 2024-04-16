import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClassService } from 'src/app/Service/Course/Class/class.service';

@Component({
  selector: 'app-get-lesson-with-id-class',
  templateUrl: './get-lesson-with-id-class.component.html',
  styleUrls: ['./get-lesson-with-id-class.component.css']
})
export class GetLessonWithIdClassComponent {
  classDetails: any;

  constructor(private classService: ClassService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const classid = params.get('id');
      if (classid !== null) {
        this.classService.retrieveClass(classid).subscribe(
          (classDetails: any) => {
            this.classDetails = classDetails;
          },
          error => {
            console.log(error);
          }
        );
      }
    });
  }
}
