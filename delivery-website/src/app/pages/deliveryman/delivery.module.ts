import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { OrderHistoryComponent } from "./order-history/order-history.component";
import { DeliverymanRoutingModule } from "./deliveryman-routing.module";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [OrderHistoryComponent],
    imports: [
        FormsModule,
        CommonModule,
        DeliverymanRoutingModule
    ]
})

export class DeliveryModule {}