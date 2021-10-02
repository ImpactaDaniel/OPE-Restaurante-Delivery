import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/deliveryman/order';
import { OrderService } from '../services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  ordersList: [] = [];

  constructor(public router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllHistory();
    console.log(this.ordersList)
  }
  
  private async getAllHistory() {
    let orders = await this.orderService.getAllOrders();
    if(orders.length > 0) {
      this.ordersList = orders
    } else {
      console.log('vazia')
    }

  }
  
  private getSelectedHistory(value: string): void {
    // servico ndo alert - mander id/nome da order e recuperar do banco os dados para mostrar no alert
  }

}
