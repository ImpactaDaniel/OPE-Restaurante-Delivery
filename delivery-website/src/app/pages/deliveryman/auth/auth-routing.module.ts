import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
})
export class AuthRoutingModule { }
