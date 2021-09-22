import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../pages/deliveryman/services/auth-service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let tokenResponse = this.authService.getToken();
        console.log(tokenResponse)
        let newReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${tokenResponse}`
            }
        })
        return next.handle(newReq);
    }
}