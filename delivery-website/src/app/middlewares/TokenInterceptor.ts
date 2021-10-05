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
        // console.log(tokenResponse)
        let newReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${tokenResponse}`
            }
        })
        return next.handle(newReq).pipe(
            catchError(response => {
                if (response instanceof HttpErrorResponse && (response.status !== 200)) {
                    this.alertService.showError()
                }
                return throwError(response)
            }
        ));
    }

}
