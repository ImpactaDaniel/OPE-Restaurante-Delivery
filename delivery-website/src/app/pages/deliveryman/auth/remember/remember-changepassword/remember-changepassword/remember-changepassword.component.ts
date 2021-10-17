import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Deliveryman } from 'src/app/models/deliveryman/deliveryman';
import { AlertService } from 'src/app/pages/deliveryman/services/alert.service';
import { AuthService } from 'src/app/pages/deliveryman/services/auth.service';

@Component({
  selector: 'app-remember-changepassword',
  templateUrl: './remember-changepassword.component.html',
  styleUrls: ['./remember-changepassword.component.css']
})
export class RememberChangePasswordComponent implements OnInit {

  message: boolean = false;
  messageAlert: string;
  token: string = '';
  changePasswordForm: FormGroup;
  private deliveryMan: Deliveryman = new Deliveryman();

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private route: ActivatedRoute, private alertService: AlertService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    this.changePasswordForm= this.formBuilder.group({
      new_password: ['', Validators.required],
      new_password_confirm: ['', Validators.required]
    })
  }

  public async save() {
    this.deliveryMan.new_password = this.changePasswordForm.get('new_password')?.value
    this.deliveryMan.new_password_confirm = this.changePasswordForm.get('new_password_confirm')?.value
    this.deliveryMan.token = this.token
    let response = await this.authService.rememberPasswordChange(this.deliveryMan)
    if (response.status === 200){
      this.alertService.redirectPasswordChange();
    } else {
      this.message = true
      this.messageAlert = response.error.message
    }
  }

}
