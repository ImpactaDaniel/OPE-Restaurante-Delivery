import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { RouterModule } from '@angular/router';
import { Error404Component } from './components/error-404/error-404.component';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    RouterModule.forRoot([
      {
        path: '', redirectTo: '/auth/login', pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/deliveryman/auth/login.module').then(m => m.LoginModule)
      },
      {
        path: 'deliveryman',
        loadChildren: () => import('./pages/deliveryman/delivery.module').then(m => m.DeliveryModule)
      },
      {
        path: '**', component: Error404Component
      }
    ])
  ],
  exports: [
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
