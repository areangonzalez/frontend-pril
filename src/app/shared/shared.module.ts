import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from "@angular/router";

import { CabeceraComponent, PieComponent } from "./layout";
//listas
import { ListaDestinatarioComponent, ListaEstudioComponent, ListaAmbienteTrabajoComponent, ListaOfertaComponent } from "./lista";
//formularios
import { LugarComponent } from "./formulario/lugar";
import { DatosPersonaComponent } from "./formulario/persona";
import { DatosDestinatarioComponent, BusquedaDestinatarioComponent } from "./formulario/destinatario";
import { EstudioComponent } from "./formulario/estudio";
import { AutoCompletarComponent } from "./formulario/auto-completar";
import { DatosAmbienteTrabajoFormComponent, DatosRepresentanteFormComponent, BusquedaAmbienteTrabajoComponent } from "./formulario/ambiente-trabajo";
import { FormOfertaComponent } from './formulario/oferta';
//vistas y tags
import { DatosDestinatarioVistaComponent } from "./vista";
import { TagComponent, VistaTagComponent } from "./formulario/tag";
//modal
import {
  ModalConfirmacionComponent, ModalContentConfirmacion,
  ModalEstudioComponent, ModalContentEstudio,
  ModalOfertaComponent, ModalContentOferta,
  ModalVistaOfertaComponent, ModalContentOfertaVista,
} from './modal'

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    CabeceraComponent, PieComponent,
    ListaDestinatarioComponent, ListaEstudioComponent, ListaAmbienteTrabajoComponent,
    LugarComponent,
    DatosPersonaComponent,
    DatosDestinatarioComponent, BusquedaDestinatarioComponent,
    EstudioComponent,
    AutoCompletarComponent,
    DatosAmbienteTrabajoFormComponent, DatosRepresentanteFormComponent, BusquedaAmbienteTrabajoComponent,
    FormOfertaComponent,ListaOfertaComponent,
    DatosDestinatarioVistaComponent,
    TagComponent, VistaTagComponent,
    ModalConfirmacionComponent, ModalContentConfirmacion,
    ModalEstudioComponent, ModalContentEstudio,
    ModalOfertaComponent, ModalContentOferta,
    ModalVistaOfertaComponent, ModalContentOfertaVista
  ],
  exports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule,
    CabeceraComponent, PieComponent,
    ListaDestinatarioComponent, ListaEstudioComponent, ListaAmbienteTrabajoComponent,
    LugarComponent,
    DatosPersonaComponent,
    DatosDestinatarioComponent, BusquedaDestinatarioComponent,
    EstudioComponent,
    AutoCompletarComponent,
    DatosAmbienteTrabajoFormComponent, DatosRepresentanteFormComponent, BusquedaAmbienteTrabajoComponent,
    FormOfertaComponent,ListaOfertaComponent,
    DatosDestinatarioVistaComponent,
    TagComponent, VistaTagComponent,
    ModalConfirmacionComponent, ModalContentConfirmacion,
    ModalEstudioComponent, ModalContentEstudio,
    ModalOfertaComponent, ModalContentOferta,
    ModalVistaOfertaComponent, ModalContentOfertaVista,

  ],
  entryComponents:[
    ModalConfirmacionComponent, ModalContentConfirmacion,
    ModalEstudioComponent, ModalContentEstudio,
    ModalOfertaComponent, ModalContentOferta,
    ModalVistaOfertaComponent, ModalContentOfertaVista,
  ]
})
export class SharedModule {}
