import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entregador } from '../entregador';

@Injectable({
    providedIn: 'root'
})

export class ChangeStatusService {

    private entregadorUrl: string = 'http://localhost:3100/api/delivery'

    constructor(private httpClient: HttpClient) {}
    
    retrieveAll(): Observable<Entregador[]> {
        return this.httpClient.get<Entregador[]>(this.entregadorUrl);
    }

    retrieveById(id: number): Observable<Entregador> {
        return this.httpClient.get<Entregador>(`${this.entregadorUrl}/${id}`);
    }
    
    // save(entregador: Entregador): Observable<Entregador> {
    //     if(entregador.id) {
    //         return this.httpClient.put<Entregador>(`${this.entregadorUrl}/${entregador.id}`, entregador)
    //     }
    // }
}

