import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Deliveryman } from '../../../../models/deliveryman/deliveryman';
import { AuthService } from 'src/app/pages/deliveryman/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public messageAlert: string = ''
  public message: boolean = false
  loginForm: FormGroup;
  
  private deliveryMan: Deliveryman = new Deliveryman();

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router){
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  
  async LogIn(){
    this.deliveryMan.username = this.loginForm.get('username')?.value
    this.deliveryMan.password = this.loginForm.get('password')?.value
    let response = await this.authService.authenticate(this.deliveryMan)
    console.log(response.access_token)
    console.log(response.current_user)
    console.log(response.status)
    this.validateMessage(response)
  }

  private validateMessage(response: any) {
    if (!response.access_token) {
      console.log('login01')
      this.message = true
      this.messageAlert = response.error.message
    } else {
      console.log('login02')
      this.router.navigate(['/deliveryman/history']);
    }
  }

}