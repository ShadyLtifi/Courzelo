import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLessonToClassComponent } from './assign-lesson-to-class.component';

describe('AssignLessonToClassComponent', () => {
  let component: AssignLessonToClassComponent;
  let fixture: ComponentFixture<AssignLessonToClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignLessonToClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignLessonToClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
