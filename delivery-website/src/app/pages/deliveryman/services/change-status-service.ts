import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';

@Injectable({
    providedIn: 'root'
})

export class ChangeStatusService {


    private changeStatusUrl: string = 'user/change-status'

    constructor(@Inject('BASE_URL') private url: string, private httpClient: HttpClient, private authService: AuthService) {
    }

    private getToken(): any {
        let data = this.authService.getToken();
        return data
    }

    public changeDeliverymanStatus(){
        let token = this.getToken();
        let headers= new HttpHeaders();
        headers = headers.set("Authorization", 'Bearer ' + token)
        headers.append('Content-Type', 'application/json');              
        return this.httpClient.get<any>(`${this.url + this.changeStatusUrl}`, { headers: headers });
    }
}
