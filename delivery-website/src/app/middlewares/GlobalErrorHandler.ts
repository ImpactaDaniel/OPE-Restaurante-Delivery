import { ErrorHandler, Injectable } from "@angular/core";
import { AlertService } from "../pages/deliveryman/services/alert.service";

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
    
    constructor(private alertService: AlertService) {}

    handleError(error: any): void {
        console.error(error);
        try {
          console.error(error);
          if (error.status !== 400 && error.status !== 401 && error.status !== 403) {
            this.alertService.showError();
            return;
          }
        } catch (err) {
          console.error(err);
        }
      }

}