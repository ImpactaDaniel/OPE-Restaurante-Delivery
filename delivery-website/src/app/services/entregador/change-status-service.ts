import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entregador } from './entregador';

@Injectable({
    providedIn: 'root'
})

export class ChangeStatusService {

    entregador: Entregador;

    private entregadorUrl: string = 'http://localhost:3100/api/delivery'

    constructor(private httpClient: HttpClient) {
        this.entregador = {id: 0, name: '', disponibilidade: false, status: ''}
    }

    changeStatusById(id: number): Observable<Entregador> {
        return this.httpClient.put<Entregador>(`${this.entregadorUrl}/${id}`, this.entregador);
    }
    // getStatusById(id: number): Observable<Entregador> {
    //     return this.httpClient.get<Entregador>(`${this.entregadorUrl}/${id}`);
    // }
    getStatusById(id: number): Observable<APIResponse<Entregador>> {
        return this.httpClient.get<APIResponse<Entregador>>(`${this.entregadorUrl}/${id}`);
    }
}


export interface APIResponse<T> {
    response: T;
    success: boolean;
    notifications: Notification[];
}
  
export interface Notification {
    code: number;
    message: string;
}
