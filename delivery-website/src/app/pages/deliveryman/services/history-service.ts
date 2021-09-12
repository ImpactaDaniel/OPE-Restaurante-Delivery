import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Deliveryman } from '../../../models/deliveryman/deliveryman';

@Injectable({
    providedIn: 'root'
})

export class HistoryService implements OnInit {


    constructor(public router: Router) {}

    ngOnInit(): void {
    }

 

}