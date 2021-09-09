import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/entregador/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  

  constructor(private authService: AuthService, private router: Router){
  }
  
  LogIn(){
    this.authService.login();
    this.router.navigate(['history']);
  }
}