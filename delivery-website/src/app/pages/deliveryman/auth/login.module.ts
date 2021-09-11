import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations: [LoginComponent],
    imports: [
        FormsModule,
        LoginRoutingModule,
        ReactiveFormsModule,
    ]
})

export class LoginModule {}