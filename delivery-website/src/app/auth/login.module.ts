import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            {
                path: 'login', component: LoginComponent
            }
        ])
    ]
})

export class LoginModule {}