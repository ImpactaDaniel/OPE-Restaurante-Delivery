import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/pages/deliveryman/services/auth.service";
import { AlertService } from "../pages/deliveryman/services/alert.service";

@Injectable()
export class GlobalErrorHandler implements HttpInterceptor{
    
    constructor(private alertService: AlertService) {}

    intercept(req: any, next: any) {
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