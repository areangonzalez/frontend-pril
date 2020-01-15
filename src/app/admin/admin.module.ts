import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import {
  VistaOficioComponent, VistaPlanComponent, VistaProfesionComponent, VistaTipoAmbienteTrabajoComponent
} from './vistas';
import { AbmTablaComponent, AbmAgregarModalComponent, ModalContentAbmAgregar, AbmFormComponent } from "./abm";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
      CommonModule, NgbModule, FormsModule, ReactiveFormsModule,
      AdminRoutingModule
    ],
    declarations: [
      AdminComponent,
      VistaOficioComponent, VistaPlanComponent, VistaProfesionComponent, VistaTipoAmbienteTrabajoComponent,
      AbmTablaComponent, AbmAgregarModalComponent, ModalContentAbmAgregar, AbmFormComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [AbmAgregarModalComponent, ModalContentAbmAgregar]
})
export class AdminModule {}
