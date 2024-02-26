import { Component, OnInit } from '@angular/core';
import { ClassService } from '../Service/Course/Class/class.service';



@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css']
})
export class BackComponent  {

  classes!: any[];

  constructor(private classService: ClassService) {}

  ngOnInit(): void {
    this.classService.getAll().subscribe(
      data => {
        this.classes = data;
      },
      error => {
        console.error('Error fetching classes:', error);
      }
    );
  }

 
 
  }


