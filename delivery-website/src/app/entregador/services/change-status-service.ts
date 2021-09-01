import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entregador } from '../entregador';

@Injectable({
    providedIn: 'root'
})

export class ChangeStatusService {

    entregador: Entregador;

    private entregadorUrl: string = 'http://localhost:3100/api/delivery'

    constructor(private httpClient: HttpClient) {
        this.entregador = {id: 0, name: '', disponibilidade: false, status: ''}
    }

    retrieveById(id: number): Observable<Entregador> {
        return this.httpClient.put<Entregador>(`${this.entregadorUrl}/${id}`, this.entregador);
    }
}

