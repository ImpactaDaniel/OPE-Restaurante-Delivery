import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DeliveryHistoryComponent } from "./delivery-history/delivery-history.component";

@NgModule({
    declarations: [
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            {
                path: 'history', component: DeliveryHistoryComponent
            }
        ])
    ]
})

export class DeliveryModule {}