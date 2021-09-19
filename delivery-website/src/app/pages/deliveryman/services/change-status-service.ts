import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

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
