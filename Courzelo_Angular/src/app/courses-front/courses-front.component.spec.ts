import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesFrontComponent } from './courses-front.component';

describe('CoursesFrontComponent', () => {
  let component: CoursesFrontComponent;
  let fixture: ComponentFixture<CoursesFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoursesFrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoursesFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
