// Imports necesarios para crear módulos
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DestinatarioModule } from "../destinatario/destinatario.module";

//Importo los componentes
import { AmbienteTrabajoComponent } from './ambiente-trabajo.component';
import { ListaAmbienteTrabajoComponent } from './lista/lista-ambiente-trabajo.component';
import { BusquedaAmbienteTrabajoComponent } from './busqueda/busqueda-ambiente-trabajo.component';
import { VistaAmbienteTrabajoComponent } from "./vista/vista-ambiente-trabajo.component";
import { FormAmbienteTrabajoComponent } from "./form/form-ambiente-trabajo.component";
import { AmbienteTrabajoFormComponent } from "./form/ambiente-trabajo/ambiente-trabajo-form.component";
import { RepresentanteFormComponent } from "./form/representante/representante-form.component";
import { OfertaComponent } from "./oferta/oferta.component";
import { ListaOfertaComponent } from "./oferta/lista/lista-oferta.component";
import { FormOfertaComponent } from "./oferta/form/form-oferta.components";
import { ModalContentOferta, ModalOfertaComponent } from "./oferta/modal/modal-oferta.component";


// Metadatos del módulo
@NgModule({
    declarations: [AmbienteTrabajoComponent, ListaAmbienteTrabajoComponent, BusquedaAmbienteTrabajoComponent, VistaAmbienteTrabajoComponent, OfertaComponent, FormAmbienteTrabajoComponent, AmbienteTrabajoFormComponent, RepresentanteFormComponent, ListaOfertaComponent, FormOfertaComponent, ModalContentOferta, ModalOfertaComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, DestinatarioModule, NgbModule.forRoot()],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [AmbienteTrabajoComponent, ListaAmbienteTrabajoComponent, BusquedaAmbienteTrabajoComponent, VistaAmbienteTrabajoComponent, OfertaComponent, FormAmbienteTrabajoComponent, AmbienteTrabajoFormComponent, RepresentanteFormComponent, ListaOfertaComponent, FormOfertaComponent, ModalContentOferta, ModalOfertaComponent, ReactiveFormsModule],
    entryComponents: [ModalContentOferta]
})
export class AmbienteTrabajoModule { }
