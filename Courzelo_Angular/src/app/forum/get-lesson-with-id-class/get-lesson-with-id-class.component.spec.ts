import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLessonWithIdClassComponent } from './get-lesson-with-id-class.component';

describe('GetLessonWithIdClassComponent', () => {
  let component: GetLessonWithIdClassComponent;
  let fixture: ComponentFixture<GetLessonWithIdClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetLessonWithIdClassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetLessonWithIdClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
