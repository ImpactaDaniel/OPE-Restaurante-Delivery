import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { DeliveryHistoryComponent } from "./delivery-history/delivery-history.component";
import { DeliverymanRoutingModule } from "./deliveryman-routing.module";

@NgModule({
    declarations: [DeliveryHistoryComponent],
    imports: [
        FormsModule,
        DeliverymanRoutingModule
    ]
})

export class DeliveryModule {}