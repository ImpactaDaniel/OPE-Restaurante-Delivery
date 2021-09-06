import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './error-404/error-404.component';
import { LoginModule } from './auth/login.module';
import { DeliveryHistoryComponent } from './delivery-history/delivery-history.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: '**', component: Error404Component
  },
  {
    path: 'history', component: DeliveryHistoryComponent
  }
];

@NgModule({
  imports: [
    LoginModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
