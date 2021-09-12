import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./login/login.component";

@NgModule({
    declarations: [LoginComponent],
    imports: [
        FormsModule,
        AuthRoutingModule,
        ReactiveFormsModule,
    ]
})

export class AuthModule {}