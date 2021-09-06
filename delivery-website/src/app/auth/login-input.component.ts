import { Component } from '@angular/core';
import { AuthService } from '../services/entregador/auth-service';
import { Router } from '@angular/router';
import { Entregador } from '../services/entregador/entregador';

@Component({
  selector: 'app-login-input',
  templateUrl: './login-input.component.html',
  styleUrls: ['./login-input.component.css']
})
export class LoginInputComponent {
  title = '';

  constructor(private authService: AuthService, private router: Router){
  }


  LogIn(){
    this.authService.login();
    this.router.navigate(['']);
  }
}