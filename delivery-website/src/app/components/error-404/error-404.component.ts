import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: './error-404.component.html'
})

export class Error404Component {

    constructor(private router: Router) {}

    sendToHome() {
        this.router.navigate(['/'])
    }
    
}