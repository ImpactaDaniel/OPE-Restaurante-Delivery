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
  private passwordChangeUrl: string = 'auth/change-password'

  constructor(@Inject('BASE_URL') private url: string, private http: HttpClient, private router: Router) {}

  public isAuthenticated(): boolean {
    let token = this.getToken();
    if (!token || token === null) {

      this.router.navigate(['/auth/login']);
      return false;
    }
    return true
  }

  public isFirstLogin(): boolean {
    let data = this.getLocalstorageData('deliveryman')
    return data.is_first_login
  }

  public async authenticate(user: Deliveryman): Promise<any> {
    if (user.username !== '' && user.password !== '' ) { 
      let result = await this.http.post<any>(`${this.url + this.authenticationUrl}`, user).toPromise()
      if (result && result.access_token) {
        this.saveToken(result.access_token);
        this.saveLocalstorageData('deliveryman', result.current_user);
        this.router.navigate(['/deliveryman/history']);
        return false
      }
      return true
    }
  }

  public async passwordChange(user: Deliveryman): Promise<any> {
    if (user.username !== '' && user.current_password !== '' && user.new_password !== '') {
      let result = await this.http.post<any>(`${this.url + this.passwordChangeUrl}`, user).toPromise()
      if (result) {
        return result
      }
      return null
    }
  }

  public logout() {      
    localStorage.clear()                      
    this.router.navigate(['/']);
  }

  private saveToken(token: TokenResponse): void {
    let data = JSON.stringify(token)
    localStorage.setItem(this.tokenKey, btoa(data));
  }

  public saveLocalstorageData(key: string, data: string): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getLocalstorageData(key: string): any {
    let data = localStorage.getItem(key);
    if (data && data !== ''){
      return JSON.parse(data)
    }
    return data
  }

  public getToken(): any {
    let data = this.getTokenFromLocalStorage(this.tokenKey)
    if (data && data !== ''){
      return JSON.parse(data)
    }
    return null
  }

  private getTokenFromLocalStorage(key: string): any{
    let value = localStorage.getItem(key);
    if (!value || value === '')
      return value
    return atob(value)
  }
}