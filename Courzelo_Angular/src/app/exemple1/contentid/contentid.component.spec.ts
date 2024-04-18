import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentidComponent } from './contentid.component';

describe('ContentidComponent', () => {
  let component: ContentidComponent;
  let fixture: ComponentFixture<ContentidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContentidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
