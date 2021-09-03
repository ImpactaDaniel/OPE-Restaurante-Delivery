import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entregador } from './entregador';

@Injectable({
    providedIn: 'root'
})

export class ChangeStatusService {

    entregador: Entregador;
    dataLogin: object;

    private changeStatusUrl: string = 'user/change-status'

    constructor(@Inject('BASE_URL') private url: string, private httpClient: HttpClient) {
        this.entregador = {name: '', disponibilidade: '', status: false}
    }

    changeStatusById(): Observable<APIResponse<Entregador>> {
        return this.httpClient.put<APIResponse<Entregador>>(`${this.url + this.changeStatusUrl}`, this.entregador);
    }
   
    getStatusById(): Observable<APIResponse<Entregador>> {
        return this.httpClient.get<APIResponse<Entregador>>(`${this.changeStatusUrl}`);
    }

    // login(){
    //     dataLogin = {} 
    //     localStorage.setItem('deliver', JSON.stringify(response));
    // }

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
