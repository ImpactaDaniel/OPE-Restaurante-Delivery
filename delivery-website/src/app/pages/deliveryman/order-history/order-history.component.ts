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

  orders: [] = [];
  filteredOrders: any[] = [];
  _filterBy: string;

  constructor(public router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllHistory();

  }
  
  private async getAllHistory() {
    let orders = await this.orderService.getAllOrders();
    if(orders.length > 0) {
      this.orders = orders
      this.filteredOrders = this.orders
    } else {
      console.log('vazia')
    }
    this.filteredOrders = this.orders
  }

  set filter(value: string) {
    this._filterBy = value
    this.filteredOrders = this.orders.filter((order: any) => order.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1)
  }

  get filter() {
    return this._filterBy;
  }
  
  private getSelectedHistory(value: string): void {
    // servico ndo alert - mander id/nome da order e recuperar do banco os dados para mostrar no alert
  }

}
