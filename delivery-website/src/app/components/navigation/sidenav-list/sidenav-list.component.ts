import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/deliveryman/services/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit()
  }

  public toHistory(): void {
    this.router.navigate(['deliveryman/history'])
    this.onSidenavClose()
  }

  public toPasswordChange(): void {
    this.router.navigate(['auth/password-change'])
    this.onSidenavClose()
  }

  public logOut() {
    this.authService.logout()
    this.onSidenavClose()
  }

}
