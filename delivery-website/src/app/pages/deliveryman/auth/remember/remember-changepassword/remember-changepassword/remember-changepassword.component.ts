import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Deliveryman } from 'src/app/models/deliveryman/deliveryman';
import { AuthService } from 'src/app/pages/deliveryman/services/auth.service';

@Component({
  selector: 'app-remember-changepassword',
  templateUrl: './remember-changepassword.component.html',
  styleUrls: ['./remember-changepassword.component.css']
})
export class RememberChangePasswordComponent implements OnInit {
  token: string;
  changePasswordForm: FormGroup;
  private deliveryMan: Deliveryman = new Deliveryman();

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token)
    });
    this.changePasswordForm= this.formBuilder.group({
      username: ['', Validators.required],
      current_password: ['', Validators.required],
      new_password: ['', Validators.required],
      new_password_confirm: ['', Validators.required]
    })
  }

  public async save() {
    this.deliveryMan.username = this.changePasswordForm.get('username')?.value
    this.deliveryMan.current_password = this.changePasswordForm.get('current_password')?.value
    this.deliveryMan.new_password = this.changePasswordForm.get('new_password')?.value
    this.deliveryMan.new_password_confirm = this.changePasswordForm.get('new_password_confirm')?.value
    // let response = await this.authService.rememberPasswordChange(this.deliveryMan)
    // console.log(response)
    console.log(this.deliveryMan)
  }

}
