import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";
import { AdminRoutingModule } from "./admin-routing.module";

import { AdminComponent } from "./admin.component";
import {
  VistaOficioComponent, VistaPlanComponent, VistaProfesionComponent, VistaTipoAmbienteTrabajoComponent
} from './vistas';
import { AbmTablaComponent, AbmAgregarModalComponent, ModalContentAbmAgregar, AbmFormComponent, AbmBorrarModalComponent, ModalContentAbmBorrar } from "./abm";
import { GestorUsuarioComponent, GuTablaComponent, ModalContentAgregarUsuario, GuAgregarUsuarioModalComponent, GuFormUsuarioComponent, GuFormAgenteComponent, GuDarRolPermisoModalComponent, ModalContentGuDarRolPermiso } from "./gestor-usuario";

@NgModule({
    imports: [
      CommonModule, NgbModule, SharedModule,
      AdminRoutingModule
    ],
    declarations: [
      AdminComponent,
      VistaOficioComponent, VistaPlanComponent, VistaProfesionComponent, VistaTipoAmbienteTrabajoComponent,
      AbmTablaComponent, AbmAgregarModalComponent, ModalContentAbmAgregar, AbmFormComponent, AbmBorrarModalComponent, ModalContentAbmBorrar,
      GestorUsuarioComponent, GuTablaComponent, ModalContentAgregarUsuario, GuAgregarUsuarioModalComponent, GuFormUsuarioComponent, GuFormAgenteComponent, GuDarRolPermisoModalComponent, ModalContentGuDarRolPermiso
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    entryComponents: [AbmAgregarModalComponent, ModalContentAbmAgregar, AbmBorrarModalComponent, ModalContentAbmBorrar, ModalContentAgregarUsuario, GuAgregarUsuarioModalComponent, GuDarRolPermisoModalComponent, ModalContentGuDarRolPermiso]
})
export class AdminModule {}
