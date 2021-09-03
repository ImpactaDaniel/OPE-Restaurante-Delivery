import { Component, OnInit } from "@angular/core";
import { Entregador } from "../services/entregador/entregador";


@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    public isMenuCollapsed = true;

  
    ngOnInit(): void {
       
    }

}