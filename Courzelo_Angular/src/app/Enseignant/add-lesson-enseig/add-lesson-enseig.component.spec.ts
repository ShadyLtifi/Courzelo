import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLessonEnseigComponent } from './add-lesson-enseig.component';

describe('AddLessonEnseigComponent', () => {
  let component: AddLessonEnseigComponent;
  let fixture: ComponentFixture<AddLessonEnseigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLessonEnseigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLessonEnseigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
