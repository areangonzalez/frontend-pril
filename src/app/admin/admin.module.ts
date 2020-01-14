import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import {
  VistaOficioComponent, VistaPlanComponent, VistaProfesionComponent, VistaTipoAmbienteTrabajoComponent
} from './vistas';
import { AbmTablaComponent } from "./abm";

@NgModule({
    imports: [
      CommonModule, NgbModule,
      AdminRoutingModule
    ],
    declarations: [
      AdminComponent,
      VistaOficioComponent, VistaPlanComponent, VistaProfesionComponent, VistaTipoAmbienteTrabajoComponent,
      AbmTablaComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
    ],
})
export class AdminModule {}
