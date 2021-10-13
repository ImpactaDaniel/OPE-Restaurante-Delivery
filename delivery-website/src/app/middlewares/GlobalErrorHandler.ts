import { HttpErrorResponse, HttpHandler, HttpInterceptor } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AlertService } from "../pages/deliveryman/services/alert.service";

@Injectable()
export class GlobalErrorHandler implements HttpInterceptor{
    
    constructor(private alertService: AlertService) {}

    intercept(req: any, next: HttpHandler) {
        return next.handle(req).pipe(
            catchError(response => {
                if (response instanceof HttpErrorResponse && response.status !== 400 || response.status !== 401 || response.status !== 403) {
                    this.alertService.showError('Ops.. Algo deu errado!', 'Tente novamente mais tarde')
                }
                return throwError(response)
            }
        ));
    }

}