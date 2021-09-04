import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Entregador } from './entregador';

@Injectable({
    providedIn: 'root'
})

export class ChangeStatusService {

    entregador: Entregador;
    dataLogin: object;
    entregadorStatus: Boolean;

    private changeStatusUrl: string = 'user/change-status'

    constructor(@Inject('BASE_URL') private url: string, private httpClient: HttpClient) {
        this.entregador = {nome: '', descricao: '', status: false}
    }

    async getTokenDeliver(key: string) {
        var localstorage = localStorage.getItem(key)
        if (localstorage !== null) {
            let data = await JSON.parse(localstorage);
            console.log(data)
            return data
        }
    }

    changeStatusDeliver(key: string){
        let headers= new HttpHeaders();
        headers = headers.set("Authorization", 'Bearer ' + key)
        headers.append('Content-Type', 'application/json');              
        return this.httpClient.get<any>(`${this.url + this.changeStatusUrl}`, { headers: headers });
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
