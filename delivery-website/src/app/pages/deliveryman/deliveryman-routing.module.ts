import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryHistoryComponent } from './delivery-history/delivery-history.component';

const routes: Routes = [
  {
    path: 'history', component: DeliveryHistoryComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)],
})
export class DeliverymanRoutingModule { }
