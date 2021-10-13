import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RememberSendemailComponent } from './remember-sendemail.component';

describe('RememberSendemailComponent', () => {
  let component: RememberSendemailComponent;
  let fixture: ComponentFixture<RememberSendemailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RememberSendemailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RememberSendemailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
