import { Component } from '@angular/core';
import { Class } from 'src/app/models/Class/class';
import { ClassService } from 'src/app/Service/Course/Class/class.service';

@Component({
  selector: 'app-all-class',
  templateUrl: './all-class.component.html',
  styleUrls: ['./all-class.component.css']
})
export class AllClassComponent {

  classes?: Class[] ;
  currentClass?: Class;
  currentIndex = -1;
  constructor(private classervice: ClassService) { }
  ngOnInit(): void {
    this.retrieveAllClass();
  }
  setActiveClass(c: Class, index: number): void {
    this.currentClass = c;
    this.currentIndex = index;
  }
  retrieveAllClass(): void {
    this.classervice.getAll()
      .subscribe(
        data => {
          this.classes = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }
}
