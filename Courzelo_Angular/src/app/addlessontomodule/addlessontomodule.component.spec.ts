import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddlessontomoduleComponent } from './addlessontomodule.component';

describe('AddlessontomoduleComponent', () => {
  let component: AddlessontomoduleComponent;
  let fixture: ComponentFixture<AddlessontomoduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddlessontomoduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddlessontomoduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
