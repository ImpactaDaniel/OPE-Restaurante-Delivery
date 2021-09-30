import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/pages/deliveryman/services/alert.service';
import { AuthService } from 'src/app/pages/deliveryman/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  statusDescription: string;
  userNameLogged: string;

  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authService: AuthService, private alertService: AlertService, public router: Router){

  }

  ngOnInit(): void {
    this.getUserNameLogged()
    this.getStatusDescriptionToHeader();
  }

  private getStatusDescriptionToHeader(): void {
    var data = this.authService.getLocalstorageData('deliveryman');
    this.statusDescription = this.alertService.descriptionStatus(data.status);
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit()
  }

  private getUserNameLogged() {
    let localstorage = this.authService.getLocalstorageData('deliveryman')
    this.userNameLogged = localstorage.username
  }

  public openAlert() {
    this.alertService.showAlertStatusChange().then(
      response => {
        if (response)
        this.statusDescription = response
      }
    )
  }

  public logOut() {
    this.authService.logout()
  }

}
