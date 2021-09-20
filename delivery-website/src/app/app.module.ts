import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { Error404Component } from './components/errors/error404/error404.component';
import { Error401Component } from './components/errors/error401/error401.component';
import { NavigationModule } from './components/navigation/navigation.module';
import { TokenInterceptor } from './middlewares/TokenInterceptor';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    NavigationModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    RouterModule.forRoot([
      {
        path: '', redirectTo: '/auth/login', pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./pages/deliveryman/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'deliveryman',
        loadChildren: () => import('./pages/deliveryman/delivery.module').then(m => m.DeliveryModule)
      },
      {
        path: 'unauthorized', component: Error401Component
      },
      {
        path: '**', component: Error404Component
      }
    ])
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
