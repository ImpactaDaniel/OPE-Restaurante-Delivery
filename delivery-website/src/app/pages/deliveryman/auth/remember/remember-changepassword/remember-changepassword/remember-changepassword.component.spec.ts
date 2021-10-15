import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RememberChangePasswordComponent } from './remember-changepassword.component';

describe('RememberChangePasswordComponent', () => {
  let component: RememberChangePasswordComponent;
  let fixture: ComponentFixture<RememberChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RememberChangePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RememberChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
