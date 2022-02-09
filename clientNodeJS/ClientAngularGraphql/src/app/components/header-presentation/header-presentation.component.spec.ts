import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderPresentationComponent } from './header-presentation.component';

describe('HeaderPresentationComponent', () => {
  let component: HeaderPresentationComponent;
  let fixture: ComponentFixture<HeaderPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderPresentationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
