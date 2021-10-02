import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/auth.guard';
import { OrderHistoryComponent } from './order-history/order-history.component';

const routes: Routes = [
  {
    path: 'history', component: OrderHistoryComponent, canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
})
export class DeliverymanRoutingModule { }
