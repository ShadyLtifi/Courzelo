import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievealluserComponent } from './retrievealluser.component';

describe('RetrievealluserComponent', () => {
  let component: RetrievealluserComponent;
  let fixture: ComponentFixture<RetrievealluserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RetrievealluserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RetrievealluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
