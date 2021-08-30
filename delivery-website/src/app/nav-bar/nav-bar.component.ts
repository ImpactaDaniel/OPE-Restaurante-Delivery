import { Component, OnInit } from "@angular/core";
import { Entregador } from "../entregador/entregador";
import { EntregadorStatusService } from "../entregador/mock-entregador-service";


@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    public isMenuCollapsed = true;

    _entregador: Entregador;
    entregadorStatus: Boolean;

    constructor(private entregadorStatusService: EntregadorStatusService) {
        this._entregador = {id: 0, name: '', disponibilidade: false, status: ''}
        this.entregadorStatus = false
    }

    ngOnInit(): void {
        this.getStatus()   
    }

    getStatus(): void {
        this.entregadorStatus = this.entregadorStatusService.getStatus().disponibilidade
    }
}