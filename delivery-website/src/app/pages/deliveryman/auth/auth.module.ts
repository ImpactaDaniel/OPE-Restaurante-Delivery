import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { MaterialModule } from "src/app/material.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { PasswordChangeComponent } from './password-change/password-change/password-change.component';
import { RememberSendemailComponent } from './remember/remember-sendemail/remember-sendemail/remember-sendemail.component';

@NgModule({
    declarations: [LoginComponent, PasswordChangeComponent, RememberSendemailComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        NgbAlertModule,
        MaterialModule
    ],
    exports: []
})

export class AuthModule {}