import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor() {}

    public showError(title?: string, message?:string, callback?: () => any): void {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: title || 'Ops.. Algo deu errado!',
            text: message || 'Tente novamente mais tarde',
            timer: 5000,
            showConfirmButton: true,
            didClose: callback
        })
    }

}