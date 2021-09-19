import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deliveryman } from 'src/app/models/deliveryman/deliveryman';
import { AuthService } from '../../../services/auth-service';

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

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      username: ['', Validators.required],
      current_password: ['', Validators.required],
      new_password: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.message = false
  }

  public async save() {
    this.deliveryMan.username = this.changePasswordForm.get('username')?.value
    this.deliveryMan.current_password = this.changePasswordForm.get('current_password')?.value
    this.deliveryMan.new_password = this.changePasswordForm.get('new_password')?.value
    let response = await this.authService.passwordChange(this.deliveryMan)
    console.log(response)
    this.validateMessage(response)
  }

  private validateMessage(mgs: string) {
    let mgsBr = ''
    if (mgs) {
      this.message = true
      if (mgs === 'Password changed successfully') {
        mgsBr = 'Senha modificada com sucesso!'
      } else {
        mgsBr = 'Não foi possível completar esta operação.'
      }
      this.messageAlert = mgsBr
    }
  }

  // public getMessageAlert(): void {
  //   this.
  // }

}
