import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RememberChangepasswordComponent } from './remember-changepassword.component';

describe('RememberChangepasswordComponent', () => {
  let component: RememberChangepasswordComponent;
  let fixture: ComponentFixture<RememberChangepasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RememberChangepasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RememberChangepasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
