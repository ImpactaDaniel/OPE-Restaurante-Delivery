import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AuthService } from './auth-service';

@Injectable({
    providedIn: 'root'
})

export class ChangeStatusService {


    private changeStatusUrl: string = 'user/change-status'

    constructor(@Inject('BASE_URL') private url: string, private httpClient: HttpClient) {
    }

    public changeDeliverymanStatus(){             
        return this.httpClient.get<any>(`${this.url + this.changeStatusUrl}`);
    }
}
