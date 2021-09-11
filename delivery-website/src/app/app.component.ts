import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/pages/deliveryman/services/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'delivery-website';

  showMenu: Boolean;
  router: Router;

  constructor(private authService: AuthService){
  }
  
  ngOnInit(){
    this.showHeader()
    // console.log(this.showMenu)
  }

  async showHeader() {
    this.showMenu = this.authService.showMenu
  }


}
