import { Injectable } from "@angular/core";
import Swal from 'sweetalert2';
import { AuthService } from "./auth.service";
import { StatusChangeService } from "./change-status-service";

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(public statusChangeService: StatusChangeService, private authService: AuthService) {}

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

    public async showAlertStatusChange(): Promise<any> {
        var saida = await Swal.fire({
            title: 'Mudança de Status',
            text: 'Deseja mudar seu status?',
            timer: 5000,
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
                    timer: 2000
                })
                return new Promise(
                    (resolve, reject) => {
                        resolve(status)
                    }
                )
            } else if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire({
                    title: 'Mudança de Status',
                    text: 'Cancelado. Tente novamente.',
                    timer: 2000
                })
              }
        })
        return saida
    }

    public descriptionStatus(response: Boolean){
        let description = response === true ? 'Disponível' : 'Indisponível';
        return description
    }

}