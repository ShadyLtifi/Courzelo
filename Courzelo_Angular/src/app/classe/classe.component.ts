import { Component } from '@angular/core';
import { ClassService } from '../Service/Course/Class/class.service';
import { Class } from '../models/Class/class';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent {
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
