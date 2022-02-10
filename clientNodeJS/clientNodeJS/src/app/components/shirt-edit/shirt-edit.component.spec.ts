import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShirtEditComponent } from './shirt-edit.component';

describe('ShirtEditComponent', () => {
  let component: ShirtEditComponent;
  let fixture: ComponentFixture<ShirtEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShirtEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShirtEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
