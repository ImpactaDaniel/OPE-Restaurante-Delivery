import { Component, OnInit } from '@angular/core';
import { Entregador } from '../../entregador/entregador';
import { EntregadorStatusService } from '../../entregador/mock-entregador-service';

@Component({
  selector: 'slide-toggle-app',
  templateUrl: 'slide-toggle.component.html',
})
export class SlideToggleComponent implements OnInit{
  
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