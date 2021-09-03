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

    getTokenDeliver(key: string) {
        var localstorage = localStorage.getItem(key)
        if (localstorage !== null) {
            let data = JSON.parse(localstorage);
            return data.access_token
        }
    }

    getStatusDeliver(key: string) {
        var localstorage = localStorage.getItem(key)
        if (localstorage !== null) {
            let data = JSON.parse(localstorage);
            return data.status
        }
    }

    changeDescStatus(content: any){
        let descricao = content === true ? 'Disponível' : 'Indisponível';
        console.log(descricao)
        return descricao
    }

    changeStatusDeliver(key: string){
        console.log(this.getTokenDeliver(key))
        let headers= new HttpHeaders();
        headers = headers.set("Authorization", 'Bearer ' + this.getTokenDeliver(key))
        headers.append('Content-Type', 'application/json');              
        return this.httpClient.get<any>(`${this.url + this.changeStatusUrl}`, { headers: headers });
    }

    // Funcao para exemplo de funcionamento do LOGIN
    login(){
        this.dataLogin = {
            access_token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTYzMDYzMTM3NSwianRpIjoiOTRlYTAzNDgtMGUzNC00NmE1LTgzODktZDMzYzhiZmMwMzdkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkFkbWluIiwibmJmIjoxNjMwNjMxMzc1LCJleHAiOjE2MzA2NzQ1NzV9.fcBWuGBvXMAwXvmoqW5DCQdGvNmw4DCK1bj0RBunH8M",
            current_user: {
                role : "Administrator",
                status : true,
                username : "Admin"
            }
        }
        this.saveLocalStorage('deliver_login', this.dataLogin)
    }

    saveLocalStorage( key: string, content: any) {
        localStorage.setItem(key, JSON.stringify(content))
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
