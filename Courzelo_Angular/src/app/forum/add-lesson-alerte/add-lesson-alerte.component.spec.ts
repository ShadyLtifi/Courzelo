import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonAlerteComponent } from './add-lesson-alerte.component';

describe('AddLessonAlerteComponent', () => {
  let component: AddLessonAlerteComponent;
  let fixture: ComponentFixture<AddLessonAlerteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessonAlerteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLessonAlerteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
