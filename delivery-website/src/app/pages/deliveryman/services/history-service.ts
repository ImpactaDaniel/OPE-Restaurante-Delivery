import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deliveryman } from '../../../models/deliveryman/deliveryman';

@Injectable({
    providedIn: 'root'
})

export class HistoryService implements OnInit {

    showMenu: Boolean;

    constructor(public router: Router) {}

    ngOnInit(): void {
        this.modifyHeader()
    }

    modifyHeader() { 
        console.log(this.router.url); 
        if (this.router.url === '/' || this.router.url === '/login') {
            return false;
        } else {
            return true;
        }
      }

}