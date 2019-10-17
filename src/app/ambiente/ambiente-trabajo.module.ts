// Imports necesarios para crear módulos
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from "../shared";
import { AmbienteTrabajoRoutingModule } from "./ambiente-trabajo-routing.module";

//Importo los componentes
import { AmbienteTrabajoComponent } from './ambiente-trabajo.component';
import { BusquedaAmbienteTrabajoComponent } from './busqueda/busqueda-ambiente-trabajo.component';
import { VistaAmbienteTrabajoComponent } from "./vista/vista-ambiente-trabajo.component";
import { FormAmbienteTrabajoComponent } from "./form/form-ambiente-trabajo.component";
import { OfertaComponent } from "./oferta/oferta.component";
//import { ListaOfertaComponent } from "./oferta/lista/lista-oferta.component";
import { FormOfertaComponent } from "./oferta/form/form-oferta.components";
import { VistaOfertaComponent } from "./oferta/vista/vista-oferta.component";
import { ModalContentOferta, ModalOfertaComponent, ModalContentOfertaVista, ModalVistaOfertaComponent } from "./oferta/modal";


// Metadatos del módulo
@NgModule({
    declarations: [AmbienteTrabajoComponent, BusquedaAmbienteTrabajoComponent, VistaAmbienteTrabajoComponent, OfertaComponent, FormAmbienteTrabajoComponent, /* ListaOfertaComponent, */ FormOfertaComponent, ModalContentOferta, ModalOfertaComponent, ModalContentOfertaVista, ModalVistaOfertaComponent, VistaOfertaComponent],
    imports: [CommonModule, NgbModule, SharedModule, AmbienteTrabajoRoutingModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [AmbienteTrabajoComponent, BusquedaAmbienteTrabajoComponent, VistaAmbienteTrabajoComponent, OfertaComponent, FormAmbienteTrabajoComponent, /* ListaOfertaComponent, */ FormOfertaComponent, ModalContentOferta, ModalOfertaComponent, ModalContentOfertaVista, ModalVistaOfertaComponent, VistaOfertaComponent],
    entryComponents: [ModalContentOferta, ModalContentOfertaVista]
})
export class AmbienteTrabajoModule { }
