import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadderrComponent } from './headderr.component';

describe('HeadderrComponent', () => {
  let component: HeadderrComponent;
  let fixture: ComponentFixture<HeadderrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadderrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadderrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
