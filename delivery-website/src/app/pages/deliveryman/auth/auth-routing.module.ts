import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PasswordChangeComponent } from './password-change/password-change/password-change.component';
import { RememberChangePasswordComponent } from './remember/remember-changepassword/remember-changepassword/remember-changepassword.component';
import { RememberSendemailComponent } from './remember/remember-sendemail/remember-sendemail/remember-sendemail.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'password-change', component: PasswordChangeComponent
  },
  {
    path: 'remember-sendemail', component: RememberSendemailComponent
  },
  {
    path: 'remember-changepassword', component: RememberChangePasswordComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
})
export class AuthRoutingModule { }
