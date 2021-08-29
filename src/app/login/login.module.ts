import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginInputComponent } from "./login-input.component";
import { LoginComponent } from "./login.component";

@NgModule({
    declarations: [
        LoginComponent,
        LoginInputComponent
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            {
                path: 'login', component: LoginComponent
            },
            {
                path: 'login-input', component: LoginInputComponent
            },
        ])
    ]
})

export class LoginModule {}