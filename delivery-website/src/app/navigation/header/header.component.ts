import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/services/entregador/history-service';
import { AuthService } from '../../services/entregador/auth-service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  showMenu: Boolean;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authService: AuthService, public router: Router){

  }
  ngOnInit(): void {
    console.log(this.showMenu)
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit()
  }

  logOut() {
    this.authService.logout()
    console.log(this.showMenu)
  }

}
