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
  private rememberPasswordChangeUrl: string = 'auth/verify-token'
  private sendEmailRememberPasswordChangeUrl: string = 'auth/forgot-password'

  constructor(@Inject('BASE_URL') private url: string, private http: HttpClient, private router: Router) {}

  public isAuthenticated(): boolean {
    let token = this.getToken();
    if (!token || token === null) {
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
      console.log('aqui_1')
      let response = await this.http.post<any>(`${this.url + this.authenticationUrl}`, user).toPromise()
        .then((result) => {
          this.saveToken(result.access_token);
          this.saveLocalstorageData('deliveryman', result.current_user);
          return result
        }).catch(error => {
          return error
      })
      return response
    }
  }

  public async passwordChange(user: Deliveryman): Promise<any> {
    if (user.username !== '' && user.current_password !== '' && user.new_password !== '' && user.new_password_confirm !== '') {
      let response = await this.http.post<any>(`${this.url + this.passwordChangeUrl}`, user).toPromise()
        .then((result) => {
          return result
      })
        .catch((error) => {
          return error
      })
      return response
     }
  }

  public async rememberPasswordChange(user: Deliveryman): Promise<any> {
    if (user.token !== '' && user.new_password !== '' && user.new_password_confirm !== '') {
      let response = this.http.post<any>(`${this.url + this.rememberPasswordChangeUrl}`, user).toPromise()
        .then((result)=>{
          return result
      })
        .catch((error)=>{
          return error
      })
      return response
    }
  }

  public async sendEmailRememberPassword(email: string): Promise<any> {
    if (email !== '') {
      let result = await this.http.post<any>(`${this.url + this.sendEmailRememberPasswordChangeUrl}`, email).toPromise()
      if (result) {
        return result
      }
      return null
    }
  }

  public logout() {      
    this.localstorageClear()             
    this.router.navigate(['/']);
  }

  public localstorageClear() {
    localStorage.clear()  
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