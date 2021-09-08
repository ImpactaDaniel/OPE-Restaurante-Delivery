import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error-404/error-404.component';
import { LoginModule } from './auth/login.module';
import { DeliveryModule } from './delivery/delivery.module';

const routes: Routes = [
  {
    path: '', redirectTo: 'login-input', pathMatch: 'full'
  },
  {
    path: '**', component: Error404Component
  }
];

@NgModule({
  imports: [
    LoginModule,
    DeliveryModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
