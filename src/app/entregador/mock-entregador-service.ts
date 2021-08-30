import { Injectable } from '@angular/core';
import { Entregador } from './entregador';

@Injectable({
    providedIn: 'root'
})

export class EntregadorStatusService {

    getStatus(): Entregador {
        return ENTREGADOR
    }
}

var ENTREGADOR: Entregador = 
    {
        id: 1,
        name: 'Jose',
        disponibilidade: false,
        status: 'Indisponivel'
    }