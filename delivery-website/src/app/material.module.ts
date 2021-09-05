import { NgModule } from "@angular/core";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [],
    exports: [
        MatSidenavModule,
        MatToolbarModule,
        MatTabsModule,
        MatButtonModule,
        MatIconModule
    ]
})

export class MaterialModule {}