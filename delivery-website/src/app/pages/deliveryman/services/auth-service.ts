import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Deliveryman } from '../../../models/deliveryman/deliveryman';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  
  private authenticationUrl: string = 'auth/login'

  constructor(@Inject('BASE_URL') private url: string,private http: HttpClient, private router: Router) {}

  async login(user: Deliveryman){

    if (user.username !== '' && user.password !== '' ) { 
      console.log(user)

      let result = await this.http.post<any>(`${this.url + this.authenticationUrl}`, user).toPromise()
      console.log(result)
      if (result && result.access_token) {
        localStorage.setItem('access_token', JSON.stringify(result.access_token));

        localStorage.setItem('deliveryman', JSON.stringify(result.current_user));
      }
      this.router.navigate(['/deliveryman/history']);
    }
  }

  descriptionStatus(response: Boolean){
    let description = response === true ? 'Disponível' : 'Indisponível';
    return description
  }

  logout() {      
    localStorage.clear()                      
    this.router.navigate(['/']);
  }
}