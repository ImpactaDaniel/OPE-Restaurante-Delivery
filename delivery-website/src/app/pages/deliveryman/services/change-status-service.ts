import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class ChangeStatusService {


    private changeStatusUrl: string = 'user/change-status'

    constructor(@Inject('BASE_URL') private url: string, private httpClient: HttpClient) {
    }

    changeDeliverymanStatus(key: string){
        let headers= new HttpHeaders();
        headers = headers.set("Authorization", 'Bearer ' + key)
        headers.append('Content-Type', 'application/json');              
        return this.httpClient.get<any>(`${this.url + this.changeStatusUrl}`, { headers: headers });
    }
}
