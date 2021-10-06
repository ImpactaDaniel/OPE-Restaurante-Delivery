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

  orders: Order[] = [];
  filteredOrders: Order[] = [];
  _filterBy: string;
  headerNames: Object[] = [];
  _selectedHeader: string;

  constructor(public router: Router, private orderService: OrderService) { }

  ngOnInit(): void {
    this.getAllOrders();
    this.getHeaderNames();
  }
  
  private async getAllOrders() {
    let orders = await this.orderService.getAllOrders();
    if(orders.length > 0) {
      this.orders = orders
      this.filteredOrders = this.orders
    } else {
      console.log('vazia')
    }
    this.filteredOrders = this.orders
  }

  get filter() {
    return this._filterBy;
  }
  set filter(value: string) {
    this._filterBy = value
    // let select = this._selectedHeader
    this.filteredOrders = this.orders.filter((order: Order) => 
      order.title.toLocaleLowerCase().indexOf(this._filterBy.toLocaleLowerCase()) > -1
    )
  }

  get selectedHeader() {
    return this._selectedHeader
  }
  set selectedHeader(value: string) {
    this._selectedHeader = value
    console.log(this._selectedHeader)
  }

  private getHeaderNames() {
    let objHeaders = [{'name': 'title', 'index': 0}, {'name':'created_at', 'index': 1}, {'name': 'address', 'index': 2}, {'name': 'status', 'index': 3}, {'name': 'price', 'index': 4}, {'name': 'payment', 'index': 5}]
    let lista: any = []
    objHeaders.forEach( value => {
      lista.push(value.name)
    })
    this.headerNames = lista
  }


  private getSelectedHistory(value: string): void {
    // servico ndo alert - mander id/nome da order e recuperar do banco os dados para mostrar no alert
  }

}
