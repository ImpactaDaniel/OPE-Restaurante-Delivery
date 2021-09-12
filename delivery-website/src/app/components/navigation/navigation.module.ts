import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ModalChangeStatusComponent } from './modal-change-status/modal-change-status.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material.module';



@NgModule({
  declarations: [HeaderComponent, ModalChangeStatusComponent, SidenavListComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    ModalChangeStatusComponent,
    SidenavListComponent,
    BrowserAnimationsModule,
    MaterialModule
  ]
})
export class NavigationModule { }
