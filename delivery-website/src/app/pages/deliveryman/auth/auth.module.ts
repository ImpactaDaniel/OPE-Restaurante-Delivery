import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbAlertModule } from "@ng-bootstrap/ng-bootstrap";
import { AlertMessageComponent } from "src/app/components/alert-message/alert-message.component";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";
import { PasswordChangeComponent } from './password-change/password-change/password-change.component';

@NgModule({
    declarations: [LoginComponent, PasswordChangeComponent, AlertMessageComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        NgbAlertModule
    ],
    exports: [
        AlertMessageComponent
    ]
})

export class AuthModule {}