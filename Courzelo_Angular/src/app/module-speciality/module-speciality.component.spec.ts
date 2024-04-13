import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleSpecialityComponent } from './module-speciality.component';

describe('ModuleSpecialityComponent', () => {
  let component: ModuleSpecialityComponent;
  let fixture: ComponentFixture<ModuleSpecialityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleSpecialityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleSpecialityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
