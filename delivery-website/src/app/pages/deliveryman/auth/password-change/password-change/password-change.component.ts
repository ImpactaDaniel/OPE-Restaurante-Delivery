import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deliveryman } from 'src/app/models/deliveryman/deliveryman';
import { AuthService } from 'src/app/pages/deliveryman/services/auth.service';
import { AlertService } from '../../../services/alert.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {

  public messageAlert: string = ''
  public message: boolean = false
  changePasswordForm: FormGroup;

  private deliveryMan: Deliveryman = new Deliveryman();

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private alertService: AlertService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      new_password_confirm: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.message = false
  }

  public async save() {
    this.deliveryMan.current_password = this.changePasswordForm.get('current_password')?.value
    this.deliveryMan.new_password = this.changePasswordForm.get('new_password')?.value
    this.deliveryMan.new_password_confirm = this.changePasswordForm.get('new_password_confirm')?.value
    let response = await this.authService.passwordChange(this.deliveryMan)
    this.validateMessage(response)
  }

  private validateMessage(response: any) {
    if (response.status === 200){
      this.alertService.redirectPasswordChange('tela inicial.', '/deliveryman/history');
    } else {
      this.message = true
      this.messageAlert = response.error.message
    }
  }
  
}
