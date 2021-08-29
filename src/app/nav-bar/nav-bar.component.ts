import { Component, OnInit } from "@angular/core";
import { Entregador } from "../entregador/entregador";
import { EntregadorStatusService } from "../entregador/entregador-status-service";


@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
    public isMenuCollapsed = true;

    _entregador: Entregador;
    entregadorStatus: string;

    constructor(private entregadorStatusService: EntregadorStatusService) {
        this._entregador = {id: 0, name: '', status: ''}
        this.entregadorStatus = ''
    }

    ngOnInit(): void {
        this.getStatus()   
    }

    getStatus(): void {
        this.entregadorStatus = this.entregadorStatusService.getStatus().status
        console.log(this.entregadorStatus)
    }
}