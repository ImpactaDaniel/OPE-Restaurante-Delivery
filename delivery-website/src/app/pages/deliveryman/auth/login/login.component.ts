import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Deliveryman } from '../../../../models/deliveryman/deliveryman';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm: FormGroup;
  
  private deliveryMan: Deliveryman = new Deliveryman();

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router){
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }
  
  LogIn(){
    this.deliveryMan.username = this.loginForm.get('username')?.value
    this.deliveryMan.password = this.loginForm.get('password')?.value
    this.authService.login(this.deliveryMan)

    // this.router.navigate(['history']);
  }
}