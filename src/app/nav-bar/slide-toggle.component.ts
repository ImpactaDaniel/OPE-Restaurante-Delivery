import { Component, OnInit } from '@angular/core';
import { Entregador } from '../entregador/entregador';
import { EntregadorStatusService } from '../entregador/entregador-status-service';

@Component({
  selector: 'slide-toggle-app',
  templateUrl: 'slide-toggle.component.html',
})
export class SlideToggleComponent implements OnInit{
  
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