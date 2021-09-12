import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  showMenu: Boolean;

  constructor(private router: Router){ }
  
  async ngOnInit(){
    this.showMenu = await this.showMenuEvent()
    console.log(this.showMenu)
  }

  async showMenuEvent(): Promise<Boolean> {
    return new Promise((s, f) => {
        this.router.events.subscribe(
          (event: any) => {
            if (event instanceof NavigationEnd) {
              return s(!(this.router.url.indexOf('auth') > 0))
            }
          }
        );
    })
  }

}
