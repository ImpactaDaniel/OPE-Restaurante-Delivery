import { Component } from '@angular/core';
import { AuthService } from './services/entregador/auth-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'delivery-website';

  showMenu: Boolean = false;

  constructor(private authService: AuthService){
  }
  
  ngOnInit(){
    this.authService.showMenu = this.showMenu;
  }
}
