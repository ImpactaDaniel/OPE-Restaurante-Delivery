import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/pages/deliveryman/services/auth.service";
import { AlertService } from "../pages/deliveryman/services/alert.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService, private alertService: AlertService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tokenResponse = this.authService.getToken();
        let newReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${tokenResponse}`
            }
        })
        return next.handle(newReq).pipe(
            catchError(response => {
                if (response instanceof HttpErrorResponse &&  (response.status !== 200) && response.url && response.url.indexOf('verify') < 0 && response.url.indexOf('auth') < 0) {
                    this.alertService.showError('Aviso.', response.error.message)
                }
                return throwError(response)
            }
        ));
    }

}
