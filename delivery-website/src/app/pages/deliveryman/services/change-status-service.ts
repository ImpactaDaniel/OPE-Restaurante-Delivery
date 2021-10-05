import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StatusChangeService {

    private changeStatusUrl: string = 'user/change-status'

    constructor(@Inject('BASE_URL') private url: string, private httpClient: HttpClient) {
    }

    public changeDeliverymanStatus(){             
        return this.httpClient.get<Promise<any>>(`${this.url + this.changeStatusUrl}`);
    }
    
}
