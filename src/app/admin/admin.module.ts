import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from "@angular/router";

import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import {
  VistaOficioComponent, VistaPlanComponent, VistaProfesionComponent, VistaRedesSocialesComponent, VistaTipoAmbienteTrabajoComponent
} from './vistas';
import { AbmTablaComponent } from "./abm";

@NgModule({
    imports: [
        AdminRoutingModule
    ],
    declarations: [
        AdminComponent,
        VistaOficioComponent, VistaPlanComponent, VistaProfesionComponent, VistaRedesSocialesComponent, VistaTipoAmbienteTrabajoComponent,
        AbmTablaComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
    ],
})
export class AdminModule {}
