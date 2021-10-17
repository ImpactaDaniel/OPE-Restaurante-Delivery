import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { StatusChangeService } from "./change-status-service";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(public statusChangeService: StatusChangeService, private authService: AuthService, private router: Router) {}

    public showError(title?: string, message?:string, callback?: () => any): void {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: title,
            text: message,
            timer: 5000,
            showConfirmButton: true,
            didClose: callback
        })
    }

    public async showAlertStatusChange(message: string): Promise<any> {
        var saida = await Swal.fire({
            title: 'Mudança de Status',
            text: message,
            timer: 6000,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'confirmar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                var response = await this.statusChangeService.changeDeliverymanStatus().toPromise()
                if (response)
                this.authService.saveLocalstorageData('deliveryman', response.current_user);
                let status = this.descriptionStatus(response.current_user.status)
                let message = status === 'Disponível'? 'Bom trabalho!': 'Até breve, bom descanso.'
                Swal.fire({
                    title: 'Mudança de Status',
                    html: `<div>Seu status foi alterado para ${status}.</div><div>${message}</div>`,
                    timer: 6000
                })
                return new Promise(
                    (resolve, reject) => {
                        resolve(status)
                    }
                )
            } else if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire({
                    title: 'Mudança de Status',
                    html: `<div>Cancelado.</div><div>Tente novamente</div>`,
                    timer: 6000
                })
              }
        })
        return saida
    }

    public descriptionStatus(response: Boolean){
        let description = response === true ? 'Disponível' : 'Indisponível';
        return description
    }

    public async redirectPasswordChange(): Promise<any> {
        var saida = await Swal.fire({
            title: 'Senha modificada!',
            html: `<div>Você será redirecionado para tela de login.</div>`,
            timer: 5000,
            showCancelButton: false,
            showConfirmButton: true,
            confirmButtonText: 'OK'
        }).then((result) => {
            if(result.isConfirmed) {
                this.router.navigate(['/auth/login']);
            }
            this.router.navigate(['/auth/login'])
        })
    }

}