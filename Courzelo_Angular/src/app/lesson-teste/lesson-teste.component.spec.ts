import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonTesteComponent } from './lesson-teste.component';

describe('LessonTesteComponent', () => {
  let component: LessonTesteComponent;
  let fixture: ComponentFixture<LessonTesteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonTesteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LessonTesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
