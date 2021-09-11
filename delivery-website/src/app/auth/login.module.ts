import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./login.component";

@NgModule({
    declarations: [
        LoginComponent,
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: 'login', component: LoginComponent
            }
        ])
    ]
})

export class LoginModule {}