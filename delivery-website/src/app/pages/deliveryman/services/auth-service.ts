import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Deliveryman } from '../../../models/entregador/entregador';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  //   private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  //   get isLoggedIn() {
  //     return this.loggedIn.asObservable(); // {2}
  //   }

  showMenu: Boolean 

  private deliveryMan: Deliveryman = new Deliveryman();

  constructor(private router: Router) {}

  login(user: Deliveryman){
    console.log(user)
    // if (user.userName !== '' && user.password !== '' ) { // {3}
    //   this.loggedIn.next(true);
    //   this.router.navigate(['/']);
    // }
    // this.showMenu = true;
  }

  logout() {                            // {4}
    // this.loggedIn.next(false);
    this.router.navigate(['/']);
    this.showMenu = false;
  }
}