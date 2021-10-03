import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { OrderHistoryComponent } from "./order-history/order-history.component";
import { DeliverymanRoutingModule } from "./deliveryman-routing.module";
import { CommonModule } from "@angular/common";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";

@NgModule({
    declarations: [OrderHistoryComponent],
    imports: [
        FormsModule,
        CommonModule,
        MatSelectModule,
        MatInputModule,
        DeliverymanRoutingModule
    ]
})

export class DeliveryModule {}