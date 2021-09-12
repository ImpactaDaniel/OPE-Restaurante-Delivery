import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Deliveryman } from '../../../models/deliveryman/deliveryman';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedIn = new BehaviorSubject<boolean>(false); 

    get isLoggedIn() {
      return this.loggedIn.asObservable(); 
    }


  private deliveryMan: Deliveryman = new Deliveryman();

  constructor(private router: Router) {}

  login(user: Deliveryman){
    console.log(user)
    // if (user.userName !== '' && user.password !== '' ) { 
    //   this.loggedIn.next(true);
    //   this.router.navigate(['/']);
    // }
  }

  logout() {                            
    // this.loggedIn.next(false);
    this.router.navigate(['/']);
  }
}