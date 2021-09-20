import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../pages/deliveryman/services/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userNameLogged: string;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authService: AuthService, public router: Router){

  }

  ngOnInit(): void {
    this.getUserNameLogged()
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit()
  }

  getUserNameLogged() {
    let localstorage = this.authService.getLocalstorageData('deliveryman')
    this.userNameLogged = localstorage.username
  }

  logOut() {
    this.authService.logout()
  }

}
