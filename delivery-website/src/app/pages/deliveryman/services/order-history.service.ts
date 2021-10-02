import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Deliveryman } from 'src/app/models/deliveryman/deliveryman';
import { Order } from 'src/app/models/deliveryman/order';

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    private orderUrl: string = 'user'

    constructor(@Inject('BASE_URL') private url: string, public router: Router, private httpClient: HttpClient) {}

    public async getAllOrders() {
        console.log(`${this.url + this.orderUrl}`)
        let orders = await this.httpClient.get<Promise<any>>(`${this.url + this.orderUrl}`).toPromise()
        if (orders) {
            console.log(orders)
            return orders.orders
        } else {
            return []
        }
    }

}

var HISTORY: Order[] = [
    {
        title: 'Feijoada'
    }
]