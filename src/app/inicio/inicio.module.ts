import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from "@angular/router";

import { InicioComponent } from "./incio.component";
import { InicioRoutingModule } from "./inicio-routing.module";

@NgModule({
    imports: [
        InicioRoutingModule
    ],
    declarations: [
        InicioComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
    ],
})
export class InicioModule {}
