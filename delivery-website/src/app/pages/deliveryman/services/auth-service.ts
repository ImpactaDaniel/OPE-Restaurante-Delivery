import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Deliveryman } from '../../../models/deliveryman/deliveryman';
import { HttpClient } from '@angular/common/http';
import { TokenResponse } from 'src/app/models/common/ITokenResponse';
import { APIResponse } from 'src/app/models/common/apiResponse';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  
  tokenKey = btoa('access_token')
  private authenticationUrl: string = 'auth/login'

  constructor(@Inject('BASE_URL') private url: string,private http: HttpClient, private router: Router) {}

  public isAuthenticated(): boolean {
    let token = this.getToken();
    if (!token || token === null) {

      this.router.navigate(['/auth/login']);
      return false;
    }
    return true
  }

  public async authenticate(user: Deliveryman): Promise<void> {
    if (user.username !== '' && user.password !== '' ) { 
      let result = await this.http.post<any>(`${this.url + this.authenticationUrl}`, user).toPromise()
      if (result && result.access_token) {
        this.saveToken(result.access_token);
        this.saveUserData(result.current_user);
      }
      this.router.navigate(['/deliveryman/history']);
    }
  }

  public logout() {      
    localStorage.clear()                      
    this.router.navigate(['/']);
  }

  private saveToken(token: any): void {
    let data = JSON.stringify(token)
    localStorage.setItem(this.tokenKey, btoa(data));
  }

  public saveUserData(data: string): void {
    localStorage.setItem('deliveryman', JSON.stringify(data));
  }

  public getToken(): any {
    let data = this.getFromLocalStorage(this.tokenKey)
    if (data && data !== ''){
      return JSON.parse(data)
    }
    return null
  }

  private getFromLocalStorage(key: string): any{
    let value = localStorage.getItem(key);
    if (!value || value === '')
      return value
    return atob(value)
  }
}