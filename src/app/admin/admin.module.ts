import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";

@NgModule({
    imports: [
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
    ],
})
export class AdminModule {}
